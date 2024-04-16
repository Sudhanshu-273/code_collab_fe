import React from 'react';
import { Helmet } from 'react-helmet';
import { createRoot } from 'react-dom/client';
import RouteController from './routes/RouteController.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
import './index.css';
import OfflineLayout from './components/OfflineLayout.jsx';

let consoleHolder = console;

function debug(bool) {
  if (!bool) {
    consoleHolder = console;
    // eslint-disable-next-line no-global-assign
    console = {};
    Object.keys(consoleHolder).forEach(function (key) {
      console[key] = function () {};
    });
  } else {
    // eslint-disable-next-line no-global-assign
    console = consoleHolder;
  }
}

debug(
  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? true : false
);

// debug(false)
root.render(
  <>
    <Helmet defaultTitle='Code Collab' titleTemplate='%s | Code Collab'>
      <meta charSet='utf-8' />
      <html lang='id' amp />
    </Helmet>
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <OfflineLayout>

    <GoogleOAuthProvider clientId='438195189683-vn4fshjdcinqb2oguddt1g6gf0h81av1.apps.googleusercontent.com'>
      <AuthProvider>
        <RouteController />
      </AuthProvider>
    </GoogleOAuthProvider>
    </OfflineLayout>
  </>
);

