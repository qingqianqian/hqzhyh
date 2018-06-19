import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { productsSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, withEdit, getNameById, findById } from 'utils';
import CatMenu from './CatMenu';

const Team = ({ product, lookup, n, d }) =>
  <div class="p16 f">
    <div class="pl32 w90">
      <h1>团队</h1>
      <div class="ui divider"></div>
    </div>
  </div>

export default compose(
  connect(productsSelector, actions),
  withEdit('product'),
  withLang
)(Team);
