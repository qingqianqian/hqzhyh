import React from 'react';
import { Button, Menu, Input, Card, Icon } from 'semantic-ui-react';
import ImageSlider from './ImageSlider';

const menus = ['home', 'products', 'news', 'training', 'tournaments', 'league', 'rating', 'contact'];
const cards = ['Products', 'News', 'Training', 'Tournaments', 'League'];

export default p =>
  <div class="ui">
    <div class="header">  
      <img src="images/banner.jpg" />
    </div>  
    <div>
      <Menu color="blue" inverted id="main-menu">
        {menus.map(x =>
          <Menu.Item name={x} active={false} />
        )}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
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

    <div class="header f jce p16">
      <div class="white ph64">
        <div class="fs24 fw8 pb16">Contact</div>
        <div>3925 Fraser Street</div>
        <div>Vancouver, BC</div>
        <div>Tel/Fax: 1-604-215-0288</div>
        <div>Email: <a href="mailto:vttc@vttc.ca">vttc@vttc.ca</a></div>
      </div>  
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.4094691796067!2d-123.09272768386832!3d49.249684379327874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673ff255560f7%3A0xf9a8f86b985e8dc5!2s3925+Fraser+St%2C+Vancouver%2C+BC+V5V+4E5!5e0!3m2!1sen!2sca!4v1522820494676" width="400" height="300" frameborder="0" style={{ border: 0 }} allowfullscreen></iframe>
    </div>  

    <div class="p16">© 2018 vttc.ca. All Rights Reserved.</div>
  </div>
