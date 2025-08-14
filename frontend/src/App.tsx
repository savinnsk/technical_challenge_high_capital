import { useState, useEffect } from 'react'
import { Cards } from './components/cards/cards'
import { Header } from './components/header/header'
import { LoginForm } from './components/login-form/login-form'
import { Notification } from './components/notification/notification'
import { validadeToken } from './services/api'
import useStore from './hooks/store'
import { RegisterModal } from './components/register-modal/register-modal'
import "./App.css"
import { StoreProvider } from './providers/store-provider'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [showRegister, setShowRegister] = useState(false)
  const store = useStore()

  const verifyToken = async (token: string) => {
    try {
      const isValid = await validadeToken(token)
      if (isValid) {
        store?.setToken(token)
        setToken(token)
      } 
    } catch(err) {
      store?.toSetError()
      store?.toSetNotification('Erro no Login');
    }
  }

  useEffect(() => {
    store?.clearLocalStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) verifyToken(storedToken)
  }, [])

  if (!token) {
    return showRegister ? (
      <StoreProvider>
        <Notification/>
        <RegisterModal
          onRegisterSuccess={(newToken: any) => {
            localStorage.setItem('token', newToken)
            setToken(newToken)
            store?.setToken(newToken)
          }}
          onCancel={() => setShowRegister(false)}
          onClose={() => setShowRegister(false)}
        />
      </StoreProvider>
    ) : (
      <StoreProvider>
        <Notification/>
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
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Cards />
        </main>
        <Notification/>
      </div>
    </StoreProvider>
  )
}

export default App;
