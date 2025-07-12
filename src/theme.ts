import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#1E1E1E',
            default: '#121212'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0'
        }
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h1: {
            fontWeight: 900, 
        },
        button: {
            fontWeight: 700, 
        }
    }
})