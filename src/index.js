const originalWarn = console.warn.bind(console.warn);
console.warn = (msg) => {
  if (msg.indexOf('ReactDOM.render is no longer supported in React 18') === -1) {
    originalWarn(msg);
  }
};

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
