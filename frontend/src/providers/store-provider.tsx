import { createContext, useCallback, useEffect, useState } from 'react';

interface StoreContextType {
  error: boolean;
  toSetError: () => void;
  notificationMessage: string | null;
  toSetNotification: (message: string) => void;

  token: string | null;
  setToken: (token: string) => void;

  chatBots: any[] | null;
  setChatBots: (bots: any[]) => void;

  clearLocalStorage :  () => void
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [chatBots, setChatBots] = useState<any[] | null>(null);


  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedChatBots = localStorage.getItem('chatBots');

    if (savedToken) setToken(savedToken);
    if (savedChatBots) setChatBots(JSON.parse(savedChatBots));
  }, []);


  const clearLocalStorage = () => {
     localStorage.setItem('chatBots',"");
  };



  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const saveChatBots = (bots: any[]) => {
    localStorage.setItem('chatBots', JSON.stringify(bots));
    setChatBots(bots);
  };

  const toSetNotification = useCallback((message: string) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
    setError(false);
  }, []);

  const toSetError = useCallback(() => {
    setError(true);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        error,
        toSetError,
        notificationMessage,
        toSetNotification,
        token,
        setToken: saveToken,
        chatBots,
        setChatBots: saveChatBots,
        clearLocalStorage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
