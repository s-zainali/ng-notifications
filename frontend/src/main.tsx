import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HelloIntern from './HelloIntern.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloIntern />
  </StrictMode>,
)
