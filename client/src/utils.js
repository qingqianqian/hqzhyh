import { tap as _tap } from 'ramda';
import { lifecycle } from 'recompose';

export const cd = 'http://res.cloudinary.com/vttc/image/upload/v1522908408/';

export const tap = _tap(console.log);

export const isDev = () => process.env.NODE_ENV === 'development';

export const withLoad = (f, ps) => lifecycle({
  componentWillMount() {
    this.props[f](ps);
  }
});