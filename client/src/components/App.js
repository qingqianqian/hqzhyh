import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Home from './Home';
import Contact from './Contact';
import { Switch, Route } from 'react-router';

export default p =>
  <div class="ui">
    <Header />
    <Menu />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/home' component={Home} />
      <Route path='/contact' component={Contact} />
    </Switch>

    <div class="ui divider"></div>
    <div class="ph16 pb16">© 2018 vttc.ca. All Rights Reserved.</div>
  </div>
