import React from 'react';
import Video from './Video';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/video" component={Video} />
      <Route path="/" exact component={App} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  ,
  document.getElementById('root')
);