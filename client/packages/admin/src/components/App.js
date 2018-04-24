import React from 'react';
import { Switch, Route } from 'react-router';
import Menu from './Menu';
import Home from './Home';
import Category from './Category';
import Products from './Products';

const App = () =>
  <div>
    <h1>VTTC Admin</h1>
    <hr/>
    <div class="p16 f">
      <Menu />
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/cats' component={Category} />
          <Route path='/products' component={Products} />
        </Switch>
      </div>
    </div>
  </div>

export default App;
