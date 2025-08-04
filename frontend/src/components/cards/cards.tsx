import { useEffect, useState } from 'react';
import useStore from '../../hooks/store'
import s from './cards.module.css'
import { getChatboots } from '../../services/api';
import { Chat } from '../chat/chat';

export function Cards() {
  const store = useStore();
  const [activeBot, setActiveBot] = useState<any | null>(null)

  const getChatBots = async () => {
    if (store?.token) {
      const chatBots = await getChatboots(store?.token);
      store.setChatBots(chatBots);
    }
  };

  useEffect(() => {
    store?.clearLocalStorage()
    getChatBots();
  }, []);

  const handleOpenChat = (bot: any) => {
  setActiveBot(bot);
  };

  const handleCloseChat = () => {
    setActiveBot(null);
  };

  return (
    <>
      <div className={s.cardsContainer}>
        {store?.chatBots?.length === 0 && (
          <p>Crie um bot para ser listado aqui.</p>
        )}
        {store?.chatBots?.map((card: any, index: number) => (
          <div
            key={index}
            className={s.card}
            onClick={() => handleOpenChat(card)}
            style={{ cursor: 'pointer' }}
          >
            <p><strong>Chatbot:</strong> {card.name}</p>
            <p><strong>Contexto:</strong> {card.context}</p>
          </div>
        ))}
      </div>

      {activeBot && <Chat bot={activeBot} onClose={handleCloseChat} />}
    </>
  );
}
