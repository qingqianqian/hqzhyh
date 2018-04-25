import React from 'react';
import { connect } from 'no-redux';
import { withState, lifecycle, compose } from 'recompose';
import { tap, cdurl } from 'utils';
import { range } from 'ramda';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';

const sl = n => 'slider' + (n ? ('-' + n) : '');

const ImageList = ({ n, name, index, lookup }) =>
  <div class="pr">
    <img src={cdurl(lookup, sl(name), 1)} class="op0 w100" />
    {range(0, n).map((x, i) =>
      <img src={cdurl(lookup, sl(name), i + 1)} class={`fade ${index === i ? 'show' : ''}`} />
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
  }),
  connect(lookupSelector, actions)
)(ImageList);
