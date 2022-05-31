import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'sweetalert2/dist/sweetalert2.css'
import { Provider } from 'react-redux'
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider >
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
  </NextUIProvider>
);

reportWebVitals();
