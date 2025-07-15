import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../public/styles/font.css'
import App from './App.tsx'
import { darkTheme } from './theme.ts'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
      <ThemeProvider theme={darkTheme} >
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
