import { useEffect, useState, useRef } from 'react';
import s from './chat.module.css';
import useStore from '../../hooks/store';
import { createMessage, getAllMessagesFromBot } from '../../services/api';

export function Chat({ bot, onClose }: { bot: any; onClose: () => void }) {
    const [messages, setMessages] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const store = useStore();
    const chatBodyRef = useRef<HTMLDivElement>(null);

    const getMessages = async () => {
        if (store?.token) {
            try {
                console.log('🔄 Carregando mensagens para o bot:', bot.name, bot.id);
                const messages = await getAllMessagesFromBot(store?.token, bot.id);
                console.log('✅ Mensagens carregadas:', messages);
                setMessages(messages);
                // Scroll para o final após carregar mensagens
                setTimeout(() => {
                    if (chatBodyRef.current) {
                        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                    }
                }, 100);
            } catch (error) {
                console.error('❌ Erro ao carregar mensagens:', error);
            }
        }
    };

    const handleSendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        
        setIsLoading(true);
        
        // Adiciona mensagem do usuário imediatamente
        const userMessage = { 
            content: trimmed, 
            role: 'user', 
            chatBotId: bot.id,
            timestamp: new Date()
        };
        
        setMessages((prev: any) => [...(prev || []), userMessage]);
        setInput('');
        
        try {
            // Envia mensagem para a API
            await createMessage(store?.token as string, {
                chatBotId: bot.id,
                content: trimmed,
            });

            // Recarrega todas as mensagens para pegar a resposta do bot
            await getMessages();
        } catch (error) {
            console.error('❌ Erro ao enviar mensagem:', error);
            // Remove a mensagem do usuário se houver erro
            setMessages((prev: any) => prev?.filter((msg: any) => msg !== userMessage));
        } finally {
            setIsLoading(false);
        }
    };

    // Recarrega mensagens quando o bot mudar
    useEffect(() => {
        if (bot?.id) {
            getMessages();
        }
    }, [bot?.id]);

    // Scroll para o final quando novas mensagens chegarem
    useEffect(() => {
        if (chatBodyRef.current && messages?.length) {
            setTimeout(() => {
                chatBodyRef.current!.scrollTop = chatBodyRef.current!.scrollHeight;
            }, 100);
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
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

    // Função para formatar timestamp
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className={s.whatsappChat}>
            {/* Header do WhatsApp */}
            <div className={s.chatHeader}>
                <div className={s.headerLeft}>
                    <button className={s.backButton} onClick={onClose}>
                        ←
                    </button>
                    <div 
                        className={s.botAvatar}
                        style={{ backgroundColor: getAvatarColor(bot.name) }}
                    >
                        {getAvatarInitials(bot.name)}
                    </div>
                    <div className={s.botInfo}>
                        <h3 className={s.botName}>{bot.name}</h3>
                        <span className={s.botStatus}>
                            {isLoading ? 'digitando...' : 'online'}
                        </span>
                    </div>
                </div>
                <div className={s.headerActions}>
                    <button className={s.headerButton}>📞</button>
                    <button className={s.headerButton}>📹</button>
                    <button className={s.headerButton}>⋮</button>
                </div>
            </div>

            {/* Corpo do chat */}
            <div className={s.chatBody} ref={chatBodyRef}>
                {messages?.map((message: any, index: number) => (
                    <div
                        key={`${message.id || index}-${message.timestamp || Date.now()}`}
                        className={s.messageContainer}
                    >
                        <div className={
                            message.role === 'user' ? s.userMessage : s.assistantMessage
                        }>
                            <p className={s.messageText}>{message.content}</p>
                            <span className={s.messageTime}>
                                {formatTime(message.timestamp ? new Date(message.timestamp) : new Date())}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={s.messageContainer}>
                        <div className={s.assistantMessage}>
                            <div className={s.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer com input */}
            <div className={s.chatFooter}>
                <div className={s.inputContainer}>
                    <button className={s.attachButton}>📎</button>
                    <input
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className={s.messageInput}
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={isLoading || !input.trim()}
                        className={s.sendButton}
                    >
                        {isLoading ? '⏳' : '➤'}
                    </button>
                </div>
            </div>
        </div>
    );
}
