import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';
import rootReducer from './reducer';
const history =require('history').createBrowserHistory()

const initialstate = {Products:{ details: []}};
//const log = createLogger({ diff:true, collapsed:true});
const middleware = [thunk];

const store = createStore( rootReducer, initialstate, applyMiddleware(thunk, routerMiddleware(history))
 );



export default store;