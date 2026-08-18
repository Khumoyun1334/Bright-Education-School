import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { SitePreferencesProvider } from './context/SitePreferences.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SitePreferencesProvider>
      <App />
    </SitePreferencesProvider>
  </BrowserRouter>,
)
