import './App.css'
import { Header } from './components/header/header'
import { StoreProvider } from './providers/store-provider'


function App() {


  return (
  <StoreProvider>
    <Header/>
    </StoreProvider>
  )
}

export default App