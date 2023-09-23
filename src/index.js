import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/tailwind-clip-path/index"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
