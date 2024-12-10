import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { config } from './config/env';
import './index.css';

const GOOGLE_CLIENT_ID = "269372507577-4p9kr2e6oooc07uv61nhj4od4mhjn86q.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
