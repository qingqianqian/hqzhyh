import { generateActions } from 'no-redux';
import { api, admin } from 'utils';

export const actionData = {
  logout: {
    url: '/logout'
  },
  lookup: {
    url: api + 'lookup'
  },
  players: {
    url: api + 'players'
  },
  products: {
    url: api + 'products'
  },
  product: {
    url: admin + 'products',
    path: 'products[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  product_f: {
    path: 'form.product'
  },
  cats: {
    url: api + 'cats'
  },
  cat: {
    url: admin + 'cats',
    path: 'cats[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  cat_f: {
    path: 'form.cat'
  },
  filter: {},
  form: {},
  lang: {},
}

export default generateActions(actionData);