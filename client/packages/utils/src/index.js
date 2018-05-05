import { tap as _tap, prop, find, pipe, isNil } from 'ramda';
import { connect } from 'no-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { successSelector } from './selectors';

export const cdurl = (l, c, n) => l.cdVersion ? `http://res.cloudinary.com/vttc/image/upload/v${l.cdVersion}/${c}/${n}.jpg` : '';

export const tap = _tap(console.log);

export const isDev = () => process.env.NODE_ENV === 'development';

export const host = isDev() ? 'http://localhost:8080/' : '/';
export const api = host + 'api/';
export const admin = host + 'admin/';

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

export const withNewValue = (p, v, f) => lifecycle({
  componentWillReceiveProps(op) {
    const ov = op[p];
    const nv = this.props[p];
    if (isNil(v) ? nv !== ov : (nv === v && ov !== v))
      f(nv);
  }
});

export const withSuccess = (a, f1, f2) => compose(
  connect(successSelector(a)),
  withNewValue('success', true, f1),
  withNewValue('success', false, f2),
);

export const withLang = withProps(p => ({ n: name(p.lang), d: desc(p.lang) }));

export const withDetail = (o, c) => withProps(p => ({ [o]: find(x => x.id == p.match.params.id, p[c || o + 's']) || {}, id: p.match.params.id }));

export const toTitleCase = s => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
