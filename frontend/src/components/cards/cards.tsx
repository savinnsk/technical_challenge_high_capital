import { useEffect, useState } from 'react';
import useStore from '../../hooks/store';
import s from './cards.module.css';
import { deleteOneChatboots, getChatboots } from '../../services/api';
import { Chat } from '../chat/chat';
import { CreateBotModal } from '../createBotModal/create-bot-modal';

export function Cards() {
  const store = useStore();
  const [activeBot, setActiveBot] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
 
  const getChatBots = async () => {
    if (store?.token) {
      const chatBots = await getChatboots(store?.token || localStorage.getItem('token') as string);
      store.setChatBots(chatBots);
    }
  };

  const handleDelete = async (e: React.MouseEvent, botId: string) => {
    e.stopPropagation(); 
    if (!store?.token) return;

    await deleteOneChatboots({ token :store.token,id: botId});
    getChatBots();
  };

  const handleOpenChat = (bot: any) => {
    // Fecha o chat anterior se houver
    if (activeBot && activeBot.id !== bot.id) {
      setActiveBot(null);
      // Pequeno delay para garantir que o chat anterior seja fechado
      setTimeout(() => {
        setActiveBot(bot);
      }, 100);
    } else {
      setActiveBot(bot);
    }
  };

  const handleCloseChat = () => {
    setActiveBot(null);
  };

  const handleCreateNewBot = () => {
    setShowModal(true);
  };

  // Função para gerar avatar baseado no nome do bot
  const getAvatarInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Função para gerar cor do avatar
  const getAvatarColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    store?.clearLocalStorage?.();
    getChatBots();
  }, []);

  // Força re-render do chat quando o bot ativo mudar
  useEffect(() => {
    if (activeBot) {
      // Pequeno delay para garantir que o DOM seja atualizado
      const timer = setTimeout(() => {
        // Força re-render
        setActiveBot({ ...activeBot });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [activeBot?.id]);

  return (
    <>
      <div className={s.whatsappContainer}>
        {/* Header do WhatsApp */}
        <div className={s.whatsappHeader}>
          <div className={s.headerContent}>
            <div className={s.headerLeft}>
              <div className={s.avatar}>
                <span>🤖</span>
              </div>
              <div className={s.headerInfo}>
                <h2>Chatbots</h2>
                <span className={s.subtitle}>
                  {store?.chatBots?.length || 0} conversas
                </span>
              </div>
            </div>
            <button 
              className={s.newChatButton}
              onClick={handleCreateNewBot}
            >
              <span>+</span>
            </button>
          </div>
        </div>

        {/* Lista de conversas */}
        <div className={s.chatList}>
          {store?.chatBots?.length === 0 && (
            <div className={s.emptyState}>
              <div className={s.emptyIcon}>💬</div>
              <p>Nenhum chatbot encontrado</p>
              <span>Crie seu primeiro bot para começar a conversar</span>
            </div>
          )}

          {store?.chatBots?.map((card: any, index: number) => (
            <div
              key={card.id || index}
              className={s.chatItem}
              onClick={() => handleOpenChat(card)}
            >
              <div className={s.chatAvatar}>
                <span style={{ backgroundColor: getAvatarColor(card.name) }}>
                  {getAvatarInitials(card.name)}
                </span>
              </div>
              
              <div className={s.chatInfo}>
                <div className={s.chatHeader}>
                  <h3 className={s.chatName}>{card.name}</h3>
                  <div className={s.chatActions}>
                    <button
                      onClick={(e) => handleDelete(e, card.id)}
                      className={s.deleteButton}
                      title="Excluir chatbot"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className={s.chatPreview}>
                  <p className={s.lastMessage}>
                    {card.context || 'Sem contexto definido'}
                  </p>
                  <span className={s.timestamp}>
                    {new Date().toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <CreateBotModal
            onClose={() => setShowModal(false)}
            onSuccess={getChatBots}
          />
        )}
      </div>

      {activeBot && (
        <Chat 
          key={`chat-${activeBot.id}-${Date.now()}`}
          bot={activeBot} 
          onClose={handleCloseChat} 
        />
      )}
    </>
  );
}
