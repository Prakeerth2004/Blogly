import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import CheckLoggedIn  from './components/CheckLoggedIn.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
  <CheckLoggedIn>
    <App />
    </CheckLoggedIn>
  </StrictMode>,

)
