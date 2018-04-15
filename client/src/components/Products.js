import React from 'react';
import { range, is } from 'ramda';
import { Button, Menu, Input, Card, Icon, Dropdown, Image } from 'semantic-ui-react';
import ImageSlider from './ImageSlider';
import { cd } from 'utils';

const cats = [['New Arrivals'], ['On Sale'], ['Blades', ['Penhold', 'Shakehand']], ['Rackets', ['Butterfly', 'Joola']], ['Rubbers', ['Butterfly', 'Joola']], ['Accessories', ['Net', 'Robot']], ['Apparel', ['Shirts', 'Shorts']], ['Footware', ['Shoes', 'Socks']]];
const pd = cd + 'products/';

export default p =>
  <div class="p16 f">
    <div class="ui vertical menu">
      {cats.map(x =>
        <div class="item">
          <div class="header">{x[0]}</div>
          {x[1] ?
            <div class="menu">
              {x[1].map(y =>
                <a class="item">{y}</a>
              )}
            </div>
          : null}  
        </div>
      )}
    </div>
    <div class="pl32 w90">
      <h1>New Arrivals</h1>
      <div class="ui divider"></div>
      <div class="ui five column grid">
        {range(0, 20).map((x, i) =>
          <div class="column">
            <div class="ui fluid card">
              <div class="image">
                <img src={pd + (i % 5 + 1) + '.jpg'} />
              </div>
              <div class="content">
                <a class="header">Racket</a>
              </div>
            </div>
          </div>
        )}  
      </div>
    </div>
  </div>