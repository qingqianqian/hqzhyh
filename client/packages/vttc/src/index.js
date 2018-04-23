import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'no-redux';
import { actionData } from 'utils/actions';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui-css/semantic.min.css';
import 'css-short';
import 'styles/styles.css';
import App from 'components/App';

ReactDOM.render(
  <Provider store={createStore(actionData)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
