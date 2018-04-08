import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui-css/semantic.min.css';
import 'css-short';
import 'styles/styles.css';
import App from 'components/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
