import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { productsSelector } from 'utils/selectors';
import { cdurl, withLoad, name } from 'utils';

const Products = ({ products, productFilter, setProductFilter, lookup }) =>
  <div class="p16 f">
    <div class="ui vertical menu">
      {lookup.cats.map(x =>
        <div class="item">
          <a class="header cp" onClick={() => setProductFilter({ cat: x.id })}>{name(x)}</a>
          {x.subs ?
            <div class="menu">
              {x.subs.map(y =>
                <a class="item" onClick={() => setProductFilter({ cat: x.id, cat1: y.id })}>{name(y)}</a>
              )}
            </div>
          : null}  
        </div>
      )}
    </div>
    <div class="pl32 w90">
      <h1>{productFilter.cat ? productFilter.cat + (productFilter.cat1 ? ' - ' + productFilter.cat1: '') : 'New Arrivals'}</h1>
      <div class="ui divider"></div>
      <div class="fw w100">
        {products.map((x, i) =>
          <div class="f w20 p8">  
            <div class="card cp">
              <img class="w100" src={cdurl(lookup, 'products', x.id)} />
              <hr />
              <div class="fv p8 fg1">
                <h3>{x.name}</h3>
                <div>{x.desc}</div>
              </div>
              <hr />
              <div class="f p8">
                <div class={`fs24 blue ${x.sale ? 'tdlt' : ''}`}>${x.price}</div>
                <div class="fs24 red pl8">{x.sale && '$' + x.sale}</div>
              </div>  
            </div>
          </div>  
        )}  
      </div>
    </div>
  </div>

export default compose(
  connect(productsSelector, actions),
  withLoad('getProducts')
)(Products);