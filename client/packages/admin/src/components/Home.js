import React from 'react';
import actions from 'utils/actions';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import { withLoad } from 'utils';
import { lookupSelector } from 'utils/selectors';

const Home = () =>
  <div>
  </div>

export default compose(
  connect(lookupSelector, actions),
  withLoad('getLookup')
)(Home)