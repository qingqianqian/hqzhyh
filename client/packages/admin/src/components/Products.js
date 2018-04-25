import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap } from 'utils';
import { productsSelector } from 'utils/selectors';
import { Table } from 'utils/comps';

const Products = ({ products }) =>
  <div>
    <h1>Products</h1>
    <hr/>
    <Table name="products" data={tap(products).map(x => ({ 'id': x.id, 'name': x.name, 'name_ch': x.name_ch, 'cat': x.cat_name, 'cat1': x.cat1_name, 'price': x.price, 'sale': x.sale, 'desc': x.desc }))} />
  </div>

export default compose(
  connect(productsSelector, actions),
  withLoad('getCats'),
  withLoad('getProducts')
)(Products)