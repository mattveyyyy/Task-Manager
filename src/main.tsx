import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../public/styles/font.css'
import App from './App.tsx'
import { darkTheme } from './theme.ts'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AddButton } from './components/AddButton/AddButton.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <App />
      <AddButton onClick={() => console.log('')}/>
    </ThemeProvider>
  </StrictMode>,
)
