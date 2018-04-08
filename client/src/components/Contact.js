import React from 'react';
import { Icon, Divider } from 'semantic-ui-react';

export default p =>
  <div class="feature alternate ui stripe vertical segment">
    <div class="ui three column center aligned divided relaxed stackable grid container">  
      <div class="row">
        <div class="column">
          <h1 class="ui icon header">Contact</h1>
          <div class="pb16">
            <i class="phone icon big" />
            <div class="fs21 pv8">1-604-215-0288</div>
          </div>  
          <div class="pb16">
            <i class="mail icon big" />
            <div class="fs21 pv8"><a href="mailto:vttc@vttc.ca">vttc@vttc.ca</a></div>
          </div>  
          <div>
            <i class="map marker alternate icon big" />
            <div class="fs21 pv8">
              <div>3925 Fraser Street</div>
              <div>Vancouver, BC</div>
            </div>
          </div>  
        </div>  
        <div class="column">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.4094691796067!2d-123.09272768386832!3d49.249684379327874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673ff255560f7%3A0xf9a8f86b985e8dc5!2s3925+Fraser+St%2C+Vancouver%2C+BC+V5V+4E5!5e0!3m2!1sen!2sca!4v1522820494676" width="400" height="300" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>  
  </div>  
