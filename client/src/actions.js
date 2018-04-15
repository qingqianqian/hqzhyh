import { generateActions } from 'no-redux';
import { isDev } from 'utils';

export const api = (isDev() ? 'http://localhost:8080' : '') + '/api/';

export const actionData = {
  products: {
    url: api + 'products'
  },
  productFilter: {},
}

export default generateActions(actionData);