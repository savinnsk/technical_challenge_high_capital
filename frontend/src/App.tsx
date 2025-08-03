import './App.css'
import { useEffect, useState } from 'react'
import { Cards } from './components/cards/cards'
import { Header } from './components/header/header'
import { StoreProvider } from './providers/store-provider'
import { LoginForm } from './components/login-form/login-form'
import useStore from './hooks/store'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const store = useStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(storedToken)
    store?.setToken(storedToken)
    setToken(storedToken);
  }, [])

  return (
    <StoreProvider>
      {token ? (
        <>
          <Header />
          <Cards />
        </>
      ) : (
        <LoginForm onLoginSuccess={(newToken : any) => {
          localStorage.setItem('token', newToken);
          setToken(newToken);
          store?.setToken(newToken);
        }} />
      )}
    </StoreProvider>
  )
}

export default App;
