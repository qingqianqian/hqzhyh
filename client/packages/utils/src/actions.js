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
    path: 'players[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  tournaments: {
    url: api + 'idname/tournaments'
  },
  tournament: {
    url: admin + 'tournaments',
    path: 'tournaments[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  teams: {
    url: api + 'tournaments/{id}'
  },
  team: {
    url: admin + 'teams',
    path: 'teams[]',
    methods: ['post', 'put', 'patch', 'delete']
  },
  products: {
    url: api + 'products'
  },
  product: {
    url: admin + 'products',
    path: 'products[]',
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