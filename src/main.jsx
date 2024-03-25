import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import store from './redux/store/index.js';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="694530165968-m7hnpg8ltb1o2sglmrjeu1rminitf19r.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);
