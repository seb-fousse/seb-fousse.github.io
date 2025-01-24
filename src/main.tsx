import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home.page.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Art from './pages/Work/art.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
