import { generateActions } from 'no-redux';
import { api } from 'utils';

export const actionData = {
  lookup: {
    url: api + 'lookup'
  },
  products: {
    url: api + 'products',
    methods: ['get', 'post']
  },
  product: {
    url: api + 'products',
    path: 'products[]',
    methods: ['put', 'patch', 'delete']
  },
  product_f: {
    path: 'form.product'
  },
  cats: {
    url: api + 'cats',
    methods: ['get', 'post']
  },
  cat: {
    url: api + 'cats',
    path: 'cats[]',
    methods: ['put', 'patch', 'delete']
  },
  cat_f: {
    path: 'form.cat'
  },
  productFilter: {},
  form: {},
  lang: {},
}

export default generateActions(actionData);