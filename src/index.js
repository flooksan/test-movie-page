import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FavoriteContextProvider } from './store/favorites-context';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FavoriteContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </FavoriteContextProvider>
  
);


