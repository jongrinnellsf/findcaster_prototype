import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './stepper';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
