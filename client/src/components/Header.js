import React from 'react';

export default p =>
  <div class="bgb f">  
    <img src="images/banner.jpg" />
    <div class="fg1 ph8 f marquee">
      <div class="f aic m1">
        {[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9].map(x =>
          <img width="130" height="130" src={`/images/m${x}.jpg`} />  
        )}
      </div>
      <div style={{ position: 'absolute', left: 0, height: '150px', width: '100%', background: 'linear-gradient(to left,  rgba(42, 27, 112,0) 75%,rgba(42, 27, 112,1) 100%),linear-gradient(to right,  rgba(42, 27, 112,0) 75%,rgba(42, 27, 112,1) 100%)'}}></div>
    </div>  
  </div>  
