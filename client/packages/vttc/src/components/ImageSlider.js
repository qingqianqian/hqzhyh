import React from 'react';
import { withState, lifecycle, compose } from 'recompose';
import { tap, cd } from 'utils';
import { range } from 'ramda';

const sl = cd + 'slider';

const ImageList = ({ n, name, index }) =>
  <div class="pr">
    <img src={sl + (name ? ('-' + name) : '') + '/1.jpg'} class="op0 w100" />
    {range(0, n).map((x, i) =>
      <img src={sl + (name ? ('-' + name + '/') : '/') + (i + 1) + '.jpg'} class={`fade ${index === i ? 'show' : ''}`} />
    )}
  </div>

const setIndex = p => setTimeout(() => p.setIndex(p.index === p.n - 1 ? 0 : p.index + 1), Math.random() * 2000 + 2000);

export default compose(
  withState('index', 'setIndex', 0),
  lifecycle({
    componentDidMount() {
      setIndex(this.props);
    },
  
    componentWillReceiveProps(p) {
      setIndex(p);
    }
  })
)(ImageList);
