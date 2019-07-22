import React, { Component } from "react";
import "antd/dist/antd.css";
import Home from "./Products/Product";
import Orders from "./Orders/Orders";
import "./App.css";
import Login from "./auth/login";
import Dashboard from "./main/Dashboard";
import { loginAction, getAuthToken } from '../action/Auth_act'
import { getAllSales } from '../action/Sales_act'
import { allLocations } from '../action/Location_action' //
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { setSelectedLocationStatus } from '../local/main'
import Sales from "./Sales/Sales";
import { Spin } from "antd";
// import { syncHistoryWithStore, routerReducer, ConnectedRouter } from 'react-router-redux'
// import { Spin } from "antd";
// import store from '../store'

const history = require('history').createBrowserHistory()


class App extends Component {


  componentWillReceiveProps(props) {

    let { auth, loadingApp, token } = props
    if(auth==false && window.location.pathname!='/login'){
      
      this.props.history.push('/login')
    }

    if(token){
      this.props.allLocations(token)
      this.props.getAllSales({token})
    }

  }
  
  
  async componentDidMount() {
    this.initApp()
    this.props.getAuthToken()
  }
  
  
  
  // this.setState({loading:false})
  // this.props.history.push('/login')
  // }
  

  
  initApp = async () => {
    // console.log("initialize")
    setSelectedLocationStatus('undefined')
    
  }
  
  render() {
    
    
    if(this.props.loadingApp) return <div style={{
      backgroundColor: '#f0f2f5',
      height: '38em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Spin />
    </div>

    return (
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/products" component={Home} />
        <Route path="/sales" component={Sales} />
        <Route path="/orders" component={Orders} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  auth: state.auth.auth,
  loadingApp: state.auth.loadingApp
})

// function mapDispatchToProps  (dispatch){
//   return bindActionCreators({loginAction, getAuthToken}, dispatch)
//  }

export default connect(mapStateToProps, { loginAction, getAuthToken, allLocations, getAllSales })(App)
