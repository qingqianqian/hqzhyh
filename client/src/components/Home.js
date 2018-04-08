import React from 'react';
import { range, is } from 'ramda';
import { Button, Menu, Input, Card, Icon, Dropdown, Image } from 'semantic-ui-react';
import ImageSlider from './ImageSlider';

const cards = ['Products', 'News', 'Training', 'Tournaments', 'League'];

export default p =>
  <div>
    <ImageSlider images={[1, 2, 3]} />

    <div class="p16">
      <h2>Introduction</h2>
      <div>
        Vancouver Table Tennis Club (VTTC) is one of the best table tennis club in the Greater Vancouver area. VTTC is located near Chinatown in Vancouver and has been opened to the public from Monday to Friday from 11AM to 11PM and Saturday from 11AM-9PM, Sunday from 11PM-7pm since September, 2004. The Club offers high quality tournament-level tables in a comfortable, well-lit playing environment.      
      </div>
    </div>  
    <div class="fw ph8 pb16">
      {cards.map((c, i) =>
        <div class="f w20 p8">
          <div class="card fv w100 cp">
            <ImageSlider images={[(i+1)*10+1, (i+1)*10+2]} />
            <div class="p8 fs18 tac">{c}</div>
          </div>
        </div>
      )}
    </div>
  </div>
