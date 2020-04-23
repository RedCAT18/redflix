import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from 'Components/Header';
import Home from 'Routes/Home/';
import TV from 'Routes/TV/';
import Search from 'Routes/Search/';
import Detail from 'Routes/Detail/';
import Series from 'Routes/Series';
import Collection from 'Routes/Collection/';

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" exact component={Search} />
      <Route path="/movie/:id" exact component={Detail} />
      <Route path="/show/:id" exact component={Detail} />
      <Route path="/show/:id/season/:season" component={Series} />
      <Route path="/collection/:id" component={Collection} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
