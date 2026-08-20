import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { SitePreferencesProvider } from './context/SitePreferences.jsx'
import { ContentProvider } from './context/ContentProvider.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SitePreferencesProvider>
      <ContentProvider><App /></ContentProvider>
    </SitePreferencesProvider>
  </BrowserRouter>,
)
