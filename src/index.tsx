import React from 'react'
import ReactDOM from 'react-dom/client'
import { HexGrid } from './HexGrid/HexGrid'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HexGrid />
  </React.StrictMode>,
)
