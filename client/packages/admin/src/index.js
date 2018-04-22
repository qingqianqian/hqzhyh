import React from 'react';
import { render } from 'react-dom';
import { Provider, createStore } from 'no-redux';
import { BrowserRouter } from 'react-router-dom';
import { actionData } from 'actions';
import App from 'components/App';
import 'css-short';
//import './styles/styles.css';

render(
  <Provider store={createStore(actionData)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </Provider>,
  document.getElementById('root')
);
