import { useEffect, useState } from 'react';
import useStore from '../../hooks/store'
import s from './cards.module.css'
import { getChatboots } from '../../services/api';

export function Cards() {
  const store = useStore();

  const getChatBots = async () => {
    if (store?.token) {
      const chatBots = await getChatboots(store?.token);
      store.setChatBots(chatBots);
    }
  };

  useEffect(() => {
    getChatBots();
  }, []);

  return (
    <div className={s.cardsContainer}>
      {store?.chatBots?.length === 0 && (
        <p className={s.noBots}>Crie um bot para ser listado aqui.</p>
      )}
      {store?.chatBots?.map((card: any, index: number) => (
        <div key={index} className={s.card}>
          <p><strong>Chatbot:</strong> {card.name}</p>
          <p><strong>Contexto:</strong> {card.context}</p>
        </div>
      ))}
    </div>
  );
}
