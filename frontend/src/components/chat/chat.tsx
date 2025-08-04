// components/chat/Chat.tsx
import { useEffect, useState } from 'react';
import s from './chat.module.css';
import useStore from '../../hooks/store';
import { getAllMessagesFromBot } from '../../services/api';

export function Chat({ bot, onClose }: { bot: any; onClose: () => void }) {
    const [messages, setMessages] = useState<any | null>(null)
    const store = useStore();

    const getMessages = async () => {
        if (store?.token) {
            const messages = await getAllMessagesFromBot(store?.token, bot.id);
            setMessages(messages)
        }
    };

    useEffect(() => {
        getMessages();
    }, []);


    return (
        <div className={s.chatWrapper}>
            <div className={s.chatHeader}>
                <h3>Conversando com: {bot.name}</h3>
                <button onClick={onClose}>Fechar</button>
            </div>
            <div className={s.chatBody}>
                {messages?.map((message: any, index: number) => (
                    <div
                        key={index}
                        className={
                            message.role === 'user' ? s.userMessage : s.assistantMessage
                        }
                    >
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className={s.chatFooter}>
                <input type="text" placeholder="Digite sua mensagem..." />
                <button>Enviar</button>
            </div>
        </div>
    );
}
