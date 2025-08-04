import { useState, useEffect } from 'react'
import { Cards } from './components/cards/cards'
import { Header } from './components/header/header'
import { LoginForm } from './components/login-form/login-form'

import { validadeToken } from './services/api'
import useStore from './hooks/store'
import { RegisterModal } from './components/register-modal/register-modal'
import "./App.css"
import { StoreContext, StoreProvider } from './providers/store-provider'
function App() {
  const [token, setToken] = useState<string | null>(null)
  const [showRegister, setShowRegister] = useState(false)
  const store = useStore()

  const verifyToken = async (token: string) => {
    const isValid = await validadeToken(token)
    if (isValid) {
      store?.setToken(token)
      setToken(token)
    } else {
      localStorage.setItem('token', '')
    }
  }

  useEffect(() => {
    store?.clearLocalStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) verifyToken(storedToken)
  }, [])

  if (!token) {
    return  showRegister ? ( <StoreProvider >
      <RegisterModal
        onRegisterSuccess={(newToken: any) => {
          localStorage.setItem('token', newToken)
          setToken(newToken)
          store?.setToken(newToken)
        }}
        onCancel={() => setShowRegister(false)}
          onClose={() => setShowRegister(false)}
      /></StoreProvider> ) : (
        <StoreProvider>
      <LoginForm
        onLoginSuccess={(newToken) => {
          localStorage.setItem('token', newToken)
          setToken(newToken)
          store?.setToken(newToken)
        }}
        onRegisterClick={() => setShowRegister(true)}
      />
      </StoreProvider>
    )
  }

  return (
    <StoreProvider>
      <Header />
      <Cards />
    </StoreProvider>
  )
}

export default App;
