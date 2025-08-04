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
      const chatBots = await getChatboots(store.token);
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
    setActiveBot(bot);
  };

  const handleCloseChat = () => {
    setActiveBot(null);
  };

  const handleCreateNewBot = () => {
    setShowModal(true);
  };

  useEffect(() => {
    store?.clearLocalStorage?.();
    getChatBots();
  }, []);

  return (
    <>
      <div className={s.cardsContainer}>
        {store?.chatBots?.length === 0 && <p>Crie um bot para ser listado aqui.</p>}

        {store?.chatBots?.map((card: any, index: number) => (
          <div
            key={index}
            className={s.card}
            onClick={() => handleOpenChat(card)}
            style={{ cursor: 'pointer' }}
          >
            <p><strong>Chatbot:</strong> {card.name}</p>
            <p><strong>Contexto:</strong> {card.context}</p>
            <button
              onClick={(e) => handleDelete(e, card.id)}
              className={s.deleteBtn}
            >
              Excluir
            </button>
          </div>
        ))}

         <div className={`${s.card} ${s.createCard}`} onClick={handleCreateNewBot}>
        <p style={{ fontSize: '18px', textAlign: 'center' }}>➕ Criar novo bot</p>
      </div>

      {showModal && (
        <CreateBotModal
          onClose={() => setShowModal(false)}
          onSuccess={getChatBots}
        />
      )}
      </div>

      {activeBot && <Chat bot={activeBot} onClose={handleCloseChat} />}
    </>
  );
}
