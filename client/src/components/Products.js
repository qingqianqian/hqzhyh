import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'actions';
import { productsSelector } from 'selectors';
import { cd, withLoad } from 'utils';

const cats = [['New Arrivals'], ['On Sale'], ['Blades', ['Penhold', 'Shakehand']], ['Rackets', ['Butterfly', 'Joola']], ['Rubbers', ['Butterfly', 'Joola']], ['Accessories', ['Net', 'Robot']], ['Apparel', ['Shirts', 'Shorts', 'Fleece']], ['Footwear', ['Shoes', 'Socks']]];
const pd = cd + 'products/';

const Products = ({ products, productFilter, setProductFilter }) =>
  <div class="p16 f">
    <div class="ui vertical menu">
      {cats.map(x =>
        <div class="item">
          <a class="header cp" onClick={() => setProductFilter({ cat: x[0] })}>{x[0]}</a>
          {x[1] ?
            <div class="menu">
              {x[1].map(y =>
                <a class="item" onClick={() => setProductFilter({ cat: x[0], cat1: y })}>{y}</a>
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
              <img class="w100" src={pd + x.id + '.jpg'} />
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