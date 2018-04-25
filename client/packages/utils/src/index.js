import { tap as _tap, prop, find, pipe } from 'ramda';
import { lifecycle, withProps } from 'recompose';

export const cdurl = (l, c, n) => l.cdVersion ? `http://res.cloudinary.com/vttc/image/upload/v${l.cdVersion}/${c}/${n}.jpg` : '';

export const tap = _tap(console.log);

export const isDev = () => process.env.NODE_ENV === 'development';

export const api = (isDev() ? 'http://localhost:8080' : '') + '/api/';

export const ml = p => l => o => o[p + '_' + l] || o[p];
export const name = ml('name');
export const desc = ml('desc');

export const findByProp = p => v => l => find(x => x[p] == v, l || []);
export const findById = findByProp('id');
export const findByName = findByProp('name');

export const getPropById = p => id => pipe(findById(id), prop(p));
export const getNameById = getPropById('name')

export const withLoad = (f, p) => lifecycle({
  componentWillMount() {
    this.props[f](this.props[p]);
  }
});

export const withLang = withProps(p => ({ n: name(p.lang), d: desc(p.lang) }));

export const toTitleCase = s => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
