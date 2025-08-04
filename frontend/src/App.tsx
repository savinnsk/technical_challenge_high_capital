import './App.css'
import { useEffect, useState } from 'react'
import { Cards } from './components/cards/cards'
import { Header } from './components/header/header'
import { StoreProvider } from './providers/store-provider'
import { LoginForm } from './components/login-form/login-form'
import useStore from './hooks/store'
import { validadeToken } from './services/api'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const store = useStore()

  const verifyToken = async (token : string) =>{
    const tokenValidated = await validadeToken(token)
    if(tokenValidated){
      store?.setToken(token)
      setToken(token);
      return tokenValidated
    }
     localStorage.setItem('token',"");
  }

  useEffect(() => {
    store?.clearLocalStorage()
    const storedToken = localStorage.getItem('token');
    verifyToken(storedToken as string)
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
