import { tap as _tap } from 'ramda';
import { lifecycle } from 'recompose';

export const cdurl = (l, c, n) => l.cdVersion ? `http://res.cloudinary.com/vttc/image/upload/v${l.cdVersion}/${c}/${n}.jpg` : '';

export const tap = _tap(console.log);

export const isDev = () => process.env.NODE_ENV === 'development';

export const api = (isDev() ? 'http://localhost:8080' : '') + '/api/';

export const ml = p => (o, l) => o[p + '_' + l] || o[p];
export const name = ml('name');
export const desc = ml('desc');

export const getPropById = p => (l, id) => ;

export const withLoad = (f, ps) => lifecycle({
  componentWillMount() {
    this.props[f](ps);
  }
});