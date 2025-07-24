import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181420',
      paper: '#262033'
    },
    text: {
      primary: '#F0F0F0',
      secondary: '#B0B0B0'
    },
    primary: {
      main: '#9C27B0',
      contrastText: '#FFFFFF'
    },
    divider: '#2f2a3a'
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 900,
    },
    button: {
      fontWeight: 700,
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover, & input:-webkit-autofill:active': {
            boxShadow: '0 0 0 1000px #262033 inset',
            WebkitTextFillColor: '#F0F0F0',
            caretColor: '#F0F0F0',
            borderRadius: '4px',
            transition: 'background-color 5000s ease-in-out 0s',
          }
        }
      }
    }
  }
  
});
