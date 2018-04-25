import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { productsSelector } from 'utils/selectors';
import { cdurl, withLoad, name, desc, getNameById, findById } from 'utils';

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
      <h1>{header(lookup.cats, productFilter)}</h1>
      <div class="ui divider"></div>
      <div class="fw w100">
        {products.map((x, i) =>
          <div class="f w20 p8">  
            <div class="card cp">
              <img class="w100" src={cdurl(lookup, 'products', x.id)} />
              <hr />
              <div class="fv p8 fg1">
                <h3>{name(x)}</h3>
                <div>{desc(x)}</div>
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

const header = (l, f) => {
    if (!f.cat) return name(l[0]);
    const c = findById(f.cat)(l);
    const c1 = findById(f.cat1)(c.subs);
    return name(c) + (c1 ? ' - ' + name(c1) : '');
}