import { useEffect, useState } from 'react';
import s from './chat.module.css';
import useStore from '../../hooks/store';
import { createMessage, getAllMessagesFromBot } from '../../services/api';

export function Chat({ bot, onClose }: { bot: any; onClose: () => void }) {
    const [messages, setMessages] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const store = useStore();

    const getMessages = async () => {
        if (store?.token) {
            const messages = await getAllMessagesFromBot(store?.token, bot.id);
            setMessages(messages)
        }
    };

  
  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsLoading(true);
    await createMessage(store?.token as string, {
      chatBotId: bot.id,
      content: trimmed,
    });

    setMessages((prev : any) => [
      ...prev,
      { content: trimmed, role: 'user', chatBotId: bot.id },
    ]);

    setInput(''); 
    await getMessages();
    setIsLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, []);

    useEffect(() => {
        getMessages();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

    return (
         <div className={s.chatWrapper}>
      <div className={s.chatHeader}>
        <h3>Conversando com: {bot.name}</h3>
        <button onClick={onClose}>Fechar</button>
      </div>

      <div className={s.chatBody}>
        {messages?.map((message : any, index : number) => (
          <div
            key={index}
            className={
              message.role === 'user' ? s.userMessage : s.assistantMessage
            }
          >
            <p>{message.content}</p>
          </div>
        ))}

        {isLoading && (
          <div className={s.assistantMessage}>
            <p>Assistente está digitando...</p>
          </div>
        )}
      </div>

      <div className={s.chatFooter}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
    );
}
