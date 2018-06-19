import React from 'react';
import { connect } from 'no-redux';
import { is } from 'ramda';
import { Link } from 'react-router-dom';
import { Button, Menu, Input, Card, Icon, Dropdown, Popup } from 'semantic-ui-react';
import { lifecycle } from 'recompose';
import actions from 'utils/actions';
import { langSelector } from 'utils/selectors';

//const menus = ['Home', 'Products', 'News', ['Training', [['Classes', 'university'], ['Coaches', 'user'], ['Players', 'users']]], 'Tournaments', 'League', 'Rating', 'Contact'];
//const menus = ['Home', 'Products', 'News', 'Players', 'Tournaments', 'Rating', 'Calendar', 'Contact'];
  const menus = ['首页', '团队', '白皮书', '协议', '会员专区', '联系我们'];
  const menusEn = ['Home', 'Team', 'Whitepaper', 'Policy', 'Member', 'Contact'];
  

const menu = ({ lang, setLang }) =>
  <div>
    <Menu color="blue" inverted id="main-menu">
      {menus.map((x, i) => {
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
        // return <Link to={'/' + (i === 0 ? '' : x)}><Menu.Item name={x} /></Link>;
        return <Link to={'/' + (i === 0 ? '' : menusEn[i])}><Menu.Item name={x} /></Link>;
      })}
      <Menu.Menu position='right'>
        <div class="f aic p4">
          {popup('English', 'c1', () => setLang())}
          {popup('中文', 'c2', () => setLang('ch'))}
          <Input icon='search' placeholder='Search...' />
        </div>
      </Menu.Menu>
    </Menu>
  </div>

const popup = (t, img, f) => <Popup content={t} position="bottom center" trigger={<a class="cp" onClick={f}><img src={`images/${img}.png`} class="mr4" /></a>} />

export default connect(langSelector, actions)(menu);