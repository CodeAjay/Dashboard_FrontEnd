import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './Store/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Store>
    <App />
    </Store>
  </StrictMode>,
)
