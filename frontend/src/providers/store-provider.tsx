import { createContext, useCallback, useState } from 'react';

interface StoreContextType {
  error: boolean; 
  toSetError: () => void;
  notificationMessage: string | null; 
  toSetNotification: (message: string) => void;
  token : string | null;
  setToken  : (token: string) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      value={{ token , setToken , error, toSetError, notificationMessage, toSetNotification }}
    >
      {children}
    </StoreContext.Provider>
  );
};
