import React from 'react';
import { is } from 'ramda';
import { Link } from 'react-router-dom';
import { Button, Menu, Input, Card, Icon, Dropdown, Popup } from 'semantic-ui-react';
import { lifecycle } from 'recompose';
import $ from 'jquery';

const menus = ['Home', 'Products', 'News', ['Training', [['Classes', 'university'], ['Coaches', 'user'], ['Players', 'users']]], 'Tournaments', 'League', 'Rating', 'Contact'];

const menu = p =>
  <div>
    <Menu color="blue" inverted id="main-menu">
      {menus.map(x => {
        if (is(Array, x)) {
          return (
            <Dropdown item simple text={x[0]}>
              <Dropdown.Menu>
                {x[1].map(y =>
                  <Dropdown.Item text={y[0]} icon={y[1]} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          );
        }
        return <Link to={x}><Menu.Item name={x} /></Link>;
      })}
      <Menu.Menu position='right'>
        <div class="f aic p4">
          <img src="images/canada.png" class="mr4" data-title="English" id="english" />
          <Popup content="中文" position="bottom center" trigger={<img src="images/china.png" class="mr4" />} />
          <Input icon='search' placeholder='Search...' />
        </div>
      </Menu.Menu>
    </Menu>
  </div>

export default lifecycle({
  componentDidMount() {
    //$('#english').popup();
  }
})(menu);