import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Popconfirm,
  Button,
  Input,
  Modal,
  Upload,
  Icon,
  message,
  Spin
} from "antd";
import axios from "axios";
import { NavLink } from "react-router-dom";
import cardorder from "../Images/cardorder.png";
import edit from "../Images/edit.png";
import del from "../Images/del.png";
import Sidebar from "../reuse/sidebar";
import { getAllProducts } from '../../action/Product_act'
import { getAuthToken } from '../../action/Auth_act'
import { getAllSales } from '../../action/Sales_act'
import { allLocations, selectLocation } from '../../action/Location_action'
import { connect } from 'react-redux'
import Spinning from "../reuse/Spinning";
import { Redirect } from 'react-router'
import SingleProfile from "./SingleProduct";
import SingleAssign from "./SingleAssign";
import Add from "../reuse/Add";
import AddProdModel from "./bin/addProdModel";
import AddLocModel from "./bin/addLocation";
import { getSelectedLocationStatus } from '../../local/main'
import LocationHead from "../reuse/LocationHead";
class Home extends Component {



  state = {
    visible: false,
    categories: "",
    showContent: false,

    showAddProduct: false,
    showAddLocation: false
  };


  async componentWillMount() {

  }

  async componentWillReceiveProps(props) {

    let isFirstSelect = await getSelectedLocationStatus()
    
    if (isFirstSelect == 'undefined') {
      let locOne = this.props.Locations[0]
      if(!locOne) return

      this.props.selectLocation(locOne)
      this.props.getAllProducts({token:this.props.token, locId:locOne._id})
      this.props.getAllSales({token:this.props.token, locId:locOne._id})
    }

    else {
      // console.log("alread", isFirstSelect, props.selectedLocation, this.props.selectedLocation)
    }
  }

  handleAddClick = (e, set) => {
    e.preventDefault()

    if (set == 'add_product') {
      this.setState({ showAddProduct: true })
    }
    else {
      this.setState({ showAddLocation: true })
    }

  }

  handleLocClick = (e, loc) => {
    e.preventDefault() 
    this.props.selectLocation(loc)
    this.props.getAllProducts({token:this.props.token, locId:loc._id})
    this.props.getAllSales({token:this.props.token, locId:loc._id})
  }

  render() {
    return (
      <div id="app">
        <Sidebar />

        <AddProdModel showAddProduct={this.state.showAddProduct} hideAddProduct={() => this.setState({ showAddProduct: false })} />
        <AddLocModel showAddLocation={this.state.showAddLocation} hideAddLocation={() => this.setState({ showAddLocation: false })} />

        <div class="main-content">
        <section class="section">
        <div class="section-header" style={{marginBottom:'0px',justifyContent:'space-between'}} >
          <h6>Lubiricant / Products</h6>
          <LocationHead   handleLocClick={this.handleLocClick}/>

        </div>

        <div class="section-body">
          </div>
          </section>

          <div class="row">

            <div class="col-2 col-sm-4 col-lg-4">
            </div>
            <div class="col-6 col-sm-4 col-lg-4">


            </div>
            <div class="col-4 col-sm-4 col-lg-4">

            </div>
            <div class="col-8 col-sm-8 col-lg-9">
            </div>
            <Add title="Add Products" set='add_product' handleAddClick={this.handleAddClick} />
            <div class="col-8 col-sm-8 col-lg-9">
            </div>

                <Add title="Add Location" set='add_location' handleAddClick={this.handleAddClick} />
            <div class="col-12 col-sm-12 col-lg-12">
              <div class="card">

                <div class="card-body">
                  <ul class="nav nav-pills" id="myTab3" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="home-tab3" data-toggle="tab" href="#home3" role="tab" aria-controls="home" aria-selected="true">Products</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="profile-tab3" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile" aria-selected="false">Assign orders</a>
                    </li>

                  </ul>
                  <div class="tab-content" id="myTabContent2">
                    <div class="tab-pane fade show active" id="home3" role="tabpanel" aria-labelledby="home-tab3">
                      <section class="section">


                        <div class="section-body">

                          <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">
                              <div class="card">

                                <div class="card-body">
                                  <div class="table-responsive">
                                    <table class="table table-striped" id="table-1">
                                      <thead>
                                        <tr>

                                          <th class="text-center">

                                          </th>
                                          <th>Service Name</th>
                                          <th>type</th>
                                          <th>Price</th>
                                          <th>Quantity</th>

                                          <th></th>
                                          <th></th>


                                        </tr>
                                      </thead>
                                      {
                                        this.props.loadingProducts ?
                                          <Spinning /> :
                                          <tbody>
                                            {
                                              this.props.products.map((item, i) => {
                                                return <SingleProfile key={i} item={item} />
                                              })
                                            }
                                          </tbody>

                                      }
                                    </table>



                                  </div>

                                </div>
                              </div></div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div class="tab-pane fade" id="profile3" role="tabpanel" aria-labelledby="profile-tab3">
                      <section class="section">


                        <div class="section-body">

                          <div class="row">
                            <div class="col-12 col-md-12 col-lg-12">
                              <div class="card">

                                <div class="card-body">
                                  <div class="table-responsive">
                                    <table class="table table-striped" id="table-1">
                                      <thead>
                                        <tr>

                                          <th class="text-center">

                                          </th>
                                          <th>Service Name</th>
                                          <th>ml</th>
                                          <th>Price</th>
                                          <th>Available Quantity</th>
                                          <th>Enter Quantity</th>

                                          <th>Action</th>
                                          <th></th>
                                          <th></th>


                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.props.loadingSale ?
                                          <Spinning /> :
                                          this.props.products.map((item, i) => {
                                            return (<SingleAssign item={item} />)
                                          })
                                        }
                                      </tbody>
                                    </table>



                                  </div>

                                </div>
                              </div></div>
                          </div>
                        </div>



                      </section>                      </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>


      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  products: state.Products.details,
  token: state.auth.token,
  loadingProducts: state.Products.loadingProducts,
  loadingSale: state.Sales.loadingSale,
  sales: state.Sales.allSales,
  Locations: state.Location.locations,

  selectedLocation: state.Location.selectedLocation
})

export default connect(mapStateToProps, { getAllProducts, getAuthToken, 
  getAllSales, allLocations, selectLocation })(Home)