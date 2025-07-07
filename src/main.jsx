/**
 * Main entry point for React app.
 * Wraps the app in BrowserRouter and AuthProvider for routing and authentication context.
 *
 * @author Brendon Serrano
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Mount the app to the root element
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
