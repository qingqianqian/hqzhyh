import React from 'react';
import { Link } from 'react-router-dom';

const s = { position: 'absolute', height: '150px', width: '10%' };
const s1 = { ...s, left: 0, background: 'linear-gradient(to left, rgba(42, 27, 112,0) 20%, rgba(42, 27, 112,1) 100%)' };
const s2 = { ...s, right: 0, background: 'linear-gradient(to right, rgba(42, 27, 112, 0) 20%, rgba(42, 27, 112, 1) 100%)' };

export default p =>
  <div class="bgb f">  
    <img src="images/banner.jpg" />
    <div class="fg1 ph8 f marquee">
      <div class="f aic m1">
        {[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9].map(x =>
          <Link to="/">
            <img width="130" height="130" src={`/images/m${x}.jpg`} />  
          </Link>
        )}
      </div>
      <div style={s1}></div>
      <div style={s2}></div>
    </div>  
  </div>  
