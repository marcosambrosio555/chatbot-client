import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { MessagesProvider } from './context/MessagesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessagesProvider>
      <App />
    </MessagesProvider>
  </React.StrictMode>,
)
