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
  player: {
    url: admin + 'players',
    path: 'players[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  tournaments: {
    url: api + 'idname/tournaments'
  },
  tour: {
    url: admin + 'tournaments',
    path: 'tournaments[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  tournament: {
    url: api + 'tournaments/{id}'
  },
  team: {
    url: admin + 'tournaments/{id1}/teams',
    path: 'tournament.teams[id]',
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
  products: {
    url: api + 'products'
  },
  product: {
    url: admin + 'products',
    path: 'products[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  schedules: {
    url: api + 'schedules'
  },
  schedule: {
    url: admin + 'schedules',
    path: 'schedules[id]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  history: {
    url: api + 'playergames/{id}'
  },
  form: {
    path: 'form.{path}'
  },
  filter: {},
  lang: {},
}

export default generateActions(actionData);