import ProductRed from './Product_red'
import AuthRed from './Auth_red'
import SalesRed from './Sales_red'
import LocationRed from './Location_reducer'
import Order_reducer from './Order_reducer'
import Customer_reducer from './Customer_reducer'
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux'

export default combineReducers({
    Products : ProductRed,
    auth: AuthRed,
    Sales:SalesRed,
    Location:LocationRed,
    Order:Order_reducer,
    Customer:Customer_reducer,
    routing: routerReducer,
})