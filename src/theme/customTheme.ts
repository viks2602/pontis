import { ThemeOptions } from "@mui/material/styles";


export const Colors = {
  primaryMain: "#369FFF",
  primaryDark: "#1363AC",
  secondary: "#49C354",
  light: "#dfe0e1",
  white: "#fff",
  black: "#000",
  link: "#4d7095",
};

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: Colors.primaryMain,
      dark:Colors.primaryDark
    },
    secondary: {
      main: Colors.secondary,
    },
    text: {
      primary: '#000000',
      secondary: '#808088',
      disabled: '#777777',
    },
    info: {
      main: '#0058E5',
    },
    warning: {
      main: '#F2AF4C',
    },
    success: {
      main: '#5DC983',
    },
    error: {
      main: '#f46162',
    },
    divider: '#E3E3E3'
  },
  typography: {
    fontFamily: 'Poppins',
    h6: {
      fontSize: '0.8rem',
      fontWeight: 700,
      lineHeight: '1rem',
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 700,
      lineHeight: '1.4rem',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: '2rem',
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 700,
      lineHeight: '2.4rem',
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 700,
      lineHeight: '2.9rem',
    },
    h1: {
      fontSize: '3.2rem',
      fontWeight: 600,
      lineHeight: '3.4rem',
    },
  },
  components: {
    // ADD COMPONENT DEFAULT STYLING HERE
  },

};