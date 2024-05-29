import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
 
import './index.css';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
 
reportWebVitals();