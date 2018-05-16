import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { productsSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, withEdit, getNameById, findById } from 'utils';
import CatMenu from './CatMenu';

const Product = ({ product, lookup, n, d }) =>
  <div class="p16 f">
    <CatMenu />
    <div class="pl32 w90">
      <h1>{n(product)}</h1>
      <div class="ui divider"></div>
      <div class="f w100">
        <img src={cdurl(lookup, 'products', product.id)} />
        <div class="fv">
          <div>{d(product)}</div>
          <br/>
          <div class={`fs24 blue ${product.sale ? 'tdlt' : ''}`}>${product.price}</div>
          <br/>
          <div class="fs24 red">{product.sale && '$' + product.sale}</div>
        </div>
      </div>
    </div>
  </div>

export default compose(
  connect(productsSelector, actions),
  withEdit('product'),
  withLang
)(Product);
