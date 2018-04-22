import React from 'react';
import { Link } from 'react-router-dom';
import { cd } from 'utils';
import { range } from 'ramda';

const s = { position: 'absolute', height: '150px', width: '10%' };
const s1 = { ...s, left: 0, background: 'linear-gradient(to left, rgba(42, 27, 112,0) 20%, rgba(42, 27, 112,1) 100%)' };
const s2 = { ...s, right: 0, background: 'linear-gradient(to right, rgba(42, 27, 112, 0) 20%, rgba(42, 27, 112, 1) 100%)' };
const n = 9;
const r1 = range(1, n + 1);
const r2 = r1.concat(r1);
const hd = cd + 'header/';

export default p =>
  <div class="bgb f">  
    <img src="images/banner.jpg" />
    <div class="fg1 ph8 f marquee">
      <div class="f aic m1">
        {r2.map(x =>
          <Link to="/">
            <img width="130" height="130" src={hd + x + '.jpg'} />  
          </Link>
        )}
      </div>
      <div style={s1}></div>
      <div style={s2}></div>
    </div>  
  </div>  
