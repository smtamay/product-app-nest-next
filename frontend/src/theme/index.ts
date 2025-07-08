// theme.js o theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // o 'dark'
    primary: {
      main: '#1976d2', // azul estándar
    },
    secondary: {
      main: '#dc004e', // rosa estándar
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

export default theme;
