import { generateActions } from 'no-redux';
import { api } from 'utils';

export const actionData = {
  lookup: {
    url: api + 'lookup'
  },
  products: {
    url: api + 'products'
  },
  productFilter: {},
}

export default generateActions(actionData);