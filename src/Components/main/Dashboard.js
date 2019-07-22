import React, { Component } from "react";
import { Card, Row, Col, Spin } from "antd";
import order from "../Images/orders.jpg";
import services from "../Images/category.jpg";
import combo from "../Images/combo.jpg";
import customer from "../Images/customes.jpg";
import prof from "../Images/professionals.jpg";
import { NavLink } from "react-router-dom";
import Sidebar from '../reuse/sidebar'
import {browserHistory} from 'react-router'
import { connect } from 'react-redux'


class Dashboard extends Component {


  state= {loading:true}

  componentDidMount(){

  }


  render() {


    return (
      <div id="app">
      <Sidebar />
      <div class="main-content">
      <section class="section">
        <div class="section-header">
          <h6>Dashboard</h6>
        </div>

        <div class="section-body">

        <div className="dashboard">
        <Row>
          <Col span={8} className="card">
            <NavLink to="/products">
              <img src={services} class="image" />
            </NavLink>
          </Col>
          <Col span={8} className="card">
            <NavLink to="/Orders">
              <img src={order} class="image" />
            </NavLink>
          </Col>
          <Col span={8} className="card">
            <NavLink to="#">
              <img src={prof} />
            </NavLink>
          </Col>
        </Row>

        <Row>
          <Col span={8} className="card">
            <NavLink to="#">
              <img src={combo} class="image" />
            </NavLink>
          </Col>
          <Col span={8} className="card">
            <NavLink to="#">
              <img src={customer} />
            </NavLink>
          </Col>
        </Row>
      </div>
        </div>
        </section>
        </div>
        </div>  
    );
  }
}


const mapStateToProps = (state)=>({
  auth:state.auth.auth,
  loadingApp: state.auth.loadingApp
})

export default connect(mapStateToProps)(Dashboard)
