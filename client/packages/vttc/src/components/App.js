import React from 'react';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import Header from './Header';
import Menu from './Menu';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import Players from './Players';
import Tournaments from './Tournaments';
import Tournament from './Tournament';
import Rating from './Rating';
import History from './History';
import Selector from './Selector';
import Contact from './Contact';
import { Switch, Route } from 'react-router';
import { withLoad } from 'utils';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';

const App = p =>
  <div class="ui">
    <Header />
    <Menu />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/home' component={Home} />
      <Route path='/selector/:name' component={Selector} />
      <Route path='/contact' component={Contact} />
      <Route exact path='/products' component={Products} />
      <Route path='/products/:id' component={Product} />
      <Route exact path='/players' component={Players} />
      <Route exact path='/tournaments' component={Tournaments} />
      <Route path='/tournaments/:id' component={Tournament} />
      <Route exact path='/rating' component={Rating} />
      <Route path='/rating/:id' component={History} />
    </Switch>

    <div class="ui divider"></div>
    <div class="ph16 pb16">© 2018 vttc.ca. All Rights Reserved.</div>
  </div>

export default App;