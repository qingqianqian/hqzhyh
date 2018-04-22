import { generateActions } from 'no-redux';
import { api } from 'utils';

export const actionData = {
  products: {
    url: api + 'products'
  },
  productFilter: {},
}

export default generateActions(actionData);