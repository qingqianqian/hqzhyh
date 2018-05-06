import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang } from 'utils';

const CatMenu = ({ lookup, setFilter, n, d }) =>
    <div class="ui vertical menu">
      {lookup.cats.map(x =>
        <div class="item">
        <a class="header cp" onClick={() => setFilter({ product: { cat: x.id } })}>{n(x)}</a>
          {x.subs ?
            <div class="menu">
              {x.subs.map(y =>
                <a class="item" onClick={() => setFilter({ product: { cat: x.id, cat1: y.id } })}>{n(y)}</a>
              )}
            </div>
          : null}  
        </div>
      )}
    </div>

export default compose(
  connect(lookupSelector, actions),
  withLang
)(CatMenu);
