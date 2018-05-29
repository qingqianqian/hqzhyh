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
import Players from './Players';
import Teams from './Teams';
import Team from './Team';
import Schedules from './Schedules';
import Schedule from './Schedule';
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
          <Route exact path='/players' component={Players} />
          <Route path='/teams/:id' component={Teams} />
          <Route path='/team/:id1/:id' component={Team} />
          <Route path='/schedules/:id' component={Schedules} />
          <Route path='/schedule/:id1/:id' component={Schedule} />
        </Switch>
      </div>
    </div>
  </div>

export default App;
