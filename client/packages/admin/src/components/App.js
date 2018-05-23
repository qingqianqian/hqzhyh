import React from 'react';
import { Switch, Route } from 'react-router';
import Menu from './Menu';
import Home from './Home';
import Cats from './Cats';
import Cat from './Cat';
import Products from './Products';
import Product from './Product';
import Tournaments from './Tournaments';
import Tournament from './Tournament';
import Header from './Header';

const App = () =>
  <div class="p16">
    <Header/>  
    <hr/>
    <div class="f">
      <Menu />
      <div class="ph16 fg1">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cats' component={Cats} />
          <Route path='/cats/:id' component={Cat} />
          <Route exact path='/products' component={Products} />
          <Route path='/products/:id' component={Product} />
          <Route exact path='/tournaments' component={Tournaments} />
          <Route path='/tournaments/:id' component={Tournament} />
        </Switch>
      </div>
    </div>
  </div>

export default App;
