import { tap as _tap, prop, find, pipe, isNil, is, isEmpty } from 'ramda';
import { connect } from 'no-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { successSelector } from './selectors';

export const cdurl = (l, c, n) => l.cdVersion ? `http://res.cloudinary.com/vttc/image/upload/v${l.cdVersion}/${c}/${n}.jpg` : '';

export const tap = x => _tap(console.log, isNil(x) ? 'null' : x);

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

export const withLoad = (p, v) => lifecycle({
  componentWillMount() {
    isEmpty(this.props[p]) && this.props['get' + p[0].toUpperCase() + p.slice(1)](v && { [v]: this.props[v] });
  }
});

export const withEdit = (p, l) => lifecycle({
  componentWillMount() {
    this.props.setForm(find(x => x.id == this.props.match.params.id, this.props[l || (p + 's')]), { path: p });
  }
});

export const withNewValue = (p, v, f) => lifecycle({
  componentWillReceiveProps(np) {
    const nv = np[p];
    const ov = this.props[p];
    if (isNil(v) ? nv !== ov : (nv === v && ov === null))
      f(this.props, nv);
  }
});

export const withSuccess = (a, f1, f2) => compose(
  connect(successSelector(a)),
  withNewValue('success', true, f1),
  withNewValue('success', false, f2),
);

export const withScrollListener = lifecycle({
    componentDidMount() {
        window.addEventListener('scroll', this.props.onScroll);
    },

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.onScroll);
    }
});

export const withLang = withProps(p => ({ n: name(p.lang), d: desc(p.lang) }));

export const withParams = withProps(p => ({ ...p.match.params }));

export const toTitleCase = s => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
