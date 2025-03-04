import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppKitProvider } from './wagmiConfig';
import { ContractProvider } from './contexts/ContractProvider';
import { DeveloperProvider } from './contexts/DeveloperContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const cookies = {};
root.render(
  <React.StrictMode>
    <AppKitProvider>
      <ContractProvider>
        <DeveloperProvider>
          <App />
        </DeveloperProvider>
      </ContractProvider>
    </AppKitProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
