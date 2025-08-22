import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<App />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
