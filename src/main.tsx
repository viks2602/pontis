import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, createTheme } from '@mui/material/styles'; 

import { themeOptions } from './theme/customTheme.ts';

import App from './App.tsx'
import store from './redux/store.ts';

const theme = createTheme(themeOptions)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </Provider>
    </ThemeProvider>
  // </React.StrictMode>,
)
