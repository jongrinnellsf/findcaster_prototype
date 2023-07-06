import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { StyledEngineProvider } from '@mui/material/styles';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
