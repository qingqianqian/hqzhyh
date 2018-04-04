import React from 'react';
import { withState, lifecycle, compose } from 'recompose';
import { tap } from 'utils';

const ImageList = ({ images, index }) =>
  <div class="pr">
    <img src={`images/${images[0]}.jpg`} class="op0 w100" />
    {images.map((x, i) =>
      <img src={`images/${x}.jpg`} class={`fade ${index === i ? 'show' : ''}`} />
    )}
  </div>

const setIndex = p => setTimeout(() => p.setIndex(p.index === p.images.length - 1 ? 0 : p.index + 1), Math.random() * 2000 + 2000);

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
