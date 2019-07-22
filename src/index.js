import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './Components/App';
import store from './store'
import * as serviceWorker from './serviceWorker';
// import { Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import { Router,Switch } from "react-router-dom";

// const history =require('history').createBrowserHistory()

const history = require('history').createBrowserHistory()

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
    <Switch>
      <App history={history}/>
      </Switch>
    </Router>
  </Provider>

), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
