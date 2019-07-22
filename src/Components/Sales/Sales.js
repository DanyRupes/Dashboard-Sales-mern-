import React, { Component } from "react";
import { Tabs, Row, Button, Modal, Input, Card, Col, Spin } from "antd";
import Sidebar from "../reuse/sidebar";
import Spinning from "../reuse/Spinning";
// import { NavLink } from "react-router-dom";
import { Tag } from "antd";
import LocationHead from "../reuse/LocationHead";
import { getAllSales } from '../../action/Sales_act'
import { getAllProducts } from '../../action/Product_act'
import { allLocations, selectLocation } from '../../action/Location_action'
import { getSelectedLocationStatus } from '../../local/main'
import { connect } from "react-redux";
import AddCustomer from "./bin/AddCustomer";
import AddSales from "./bin/AddSales";


const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
export class Sales extends Component {
  state = { visible: false, verify: 'Verify', showAddCustomer: false, selectedSale: '', showAddSale: false };

  //Modal
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  componentDidMount() {

  }
  async componentWillReceiveProps(props) {
    let isFirstSelect = await getSelectedLocationStatus()

    if (isFirstSelect == 'undefined') {
      let locOne = this.props.Locations[0]
      if (!locOne) return

      this.props.selectLocation(locOne)
      this.props.getAllProducts({ token: this.props.token, locId: locOne._id })
      this.props.getAllSales({ token: this.props.token, locId: locOne._id })
    }

    else {
      // console.log("alread", isFirstSelect, props.selectedLocation, this.props.selectedLocation)
    }
  }

  handleLocClick = (e, loc) => {
    e.preventDefault()
    this.props.selectLocation(loc)
    this.props.getAllProducts({ token: this.props.token, locId: loc._id })
    this.props.getAllSales({ token: this.props.token, locId: loc._id })
  }

  //Modal
  render() {
    return (
      <div id="app">
        <Sidebar />
        <AddCustomer selectedSale={this.state.selectedSale} showAddCustomer={this.state.showAddCustomer} hideAddCustomer={() => this.setState({ showAddCustomer: false })} />

        <AddSales showAddSale={this.state.showAddSale} hideAllSale={() => this.setState({ showAddSale: false })} />
        <div class="main-content">
          <section class="section">
            <div class="section-header" style={{justifyContent:'space-evenly', marginBottom:'0px'}}>
              <h6>Lubricant > Sales & Customers</h6>
              <LocationHead handleLocClick={this.handleLocClick} />

              <div class="col-4 col-sm-4 col-lg-3">
                <div class="buttons btn-top">
                  <a href="" style={{ margin: '0px'}} onClick={(e) => {
                    e.preventDefault()
                    this.setState({ showAddSale: true })
                  }}
                    class="btn btn-icon btn-primary "><i class="far fa-edit"></i>Add Sales</a>
                </div>
              </div>
            </div>

            <div class="section-body">
              <div class="row">
                <div class="col-12">
                  <div class="card">

                    <div class="row">
                      <div class="col-2 col-sm-4 col-lg-4">
                      </div>
                      <div class="col-6 col-sm-4 col-lg-4">

                      </div>
                      <div class="col-4 col-sm-4 col-lg-4">

                      </div>
                      <div class="col-8 col-sm-8 col-lg-9">
                      </div>


                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-striped" id="table-1">
                          <thead>
                            <tr>
                              <th class="text-center"></th>


                              <th class="text-center">Name</th>
                              <th class="text-center">Phone No</th>

                              <th class="text-center">Address</th>

                              <th class="text-center"></th>
                              <th class="text-center"></th>

                              <th class="text-center"></th>

                            </tr>
                          </thead>

                          {
                            this.props.loadingSale ? <Spinning /> :
                              this.props.sales.length < 0 ? <tbody><tr><td>No Sales Available</td></tr></tbody> :
                                this.props.sales.map((sale, i) => {
                                  let { name, phoneno, address, city, _id } = sale

                                  return (
                                    <tbody key={i}>
                                      <tr>
                                        <td>1</td>
                                        <td >{name}</td>

                                        <td> {phoneno}</td>
                                        <td>
                                          {address} , {city}

                                        </td>
                                        <td> <a class="btn  mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
                                        </td>
                                        <td>              <a class="btn " data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i>Delete</a>
                                        </td>
                                        <td>
                                          <div class="card-header-action">

                                            <a class="btn btn-secondary" data-toggle="collapse" href="#mycard-collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                                              Show More
                             </a>
                                          </div>

                                        </td>

                                      </tr>
                                      <tr colspan="12" class="collapse show" id="mycard-collapse" style={{ textAlign: "center" }}>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                        <td>
                                          <div >Customers</div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      {
                                        sale.customers.map((custom, j) => {
                                          let { name, phoneno, place, pincode, city, address } = custom
                                          return (
                                            <tr colspan="12" class="collapse show" id="mycard-collapse">
                                              <td></td>
                                              <td >{name}</td>

                                              <td> {phoneno}</td>
                                              <td>
                                                {address}, {city}

                                              </td>
                                              <td> <a class="btn  mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
                                              </td>
                                              <td>              <a class="btn " data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i>Delete</a>
                                              </td>
                                              <td>
                                                <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                  Assign to
                          </button>
                                                <div class="dropdown-menu">
                                                  <a class="dropdown-item" href="#">Sales 1</a>
                                                  <a class="dropdown-item" href="#">Sales 2</a>
                                                  <a class="dropdown-item" href="#">Sales 3</a>
                                                </div>

                                              </td>

                                            </tr>
                                          )
                                        })
                                      }

                                      <tr colspan="12">
                                        <td></td>

                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                        <td>
                                          <div >
                                            <div class="buttons">
                                              <a href="" onClick={(e) => {
                                                e.preventDefault()
                                                this.setState({ showAddCustomer: true, selectedSale: sale })
                                              }} class="btn btn-icon btn-danger"><i class="far fa-edit"></i>Add Customers</a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )
                                })
                          }

                        </table>



                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </section>
        </div>
        <footer class="main-footer">
          <div class="footer-left">
            Lubricant  Copyright &copy; 2019 <div class="bullet"></div>
          </div>
          <div class="footer-right">
            Design By <a href="https://thebluesconsultants.com">The Blues Consultants</a>
          </div>
        </footer>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  products: state.Products.details,
  token: state.auth.token,
  loadingSale: state.Sales.loadingSale,
  sales: state.Sales.allSales,
  Locations: state.Location.locations,
  selectedLocation: state.Location.selectedLocation
})

export default connect(mapStateToProps, {
  getAllProducts,
  getAllSales, allLocations, selectLocation
})(Sales)