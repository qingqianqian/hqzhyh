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
  tournaments: {
    url: api + 'idname/tournaments'
  },
  tournament: {
    url: api + 'tournaments/{id}'
  },
  products: {
    url: api + 'products'
  },
  product: {
    url: admin + 'products',
    path: 'products[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  cats: {
    url: api + 'cats'
  },
  cat: {
    url: admin + 'cats',
    path: 'cats[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  form: {
    path: 'form.{path}'
  },
  filter: {},
  lang: {},
}

export default generateActions(actionData);