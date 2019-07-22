import React, { Component } from "react";
import { Col, Card, Spin } from "antd";
import { NavLink } from "react-router-dom";

import Sidebar from "../reuse/sidebar";
import AddCustomer from "../Sales/bin/AddCustomer";
import AddOrder from "./bin/AddOrder";
import { connect } from 'react-redux'
import { getAllOrders } from '../../action/Orders_action'
import { getAllCustomers} from '../../action/Customer_action'

// import Spinning from "../reuse/Spinning";

class Orders extends Component {


  state = {
    showAddOrder:false,showAddCustomer:false,
  }


  componentDidMount () {
    this.props.getAllOrders({token:this.props.token})
  }

  render() {
    return (
      <div id="app">
        <Sidebar />
        <div class="main-content">
          <section class="section">
            <div class="section-header" style={{justifyContent: 'space-between', marginBottom:'0px '}}>
              <h6>Lubricant > Orders</h6>
              <div class="col-4 col-sm-4 col-lg-3">
                          <div class="buttons btn-top">
                            <a href="" onClick={(e)=>{
                              e.preventDefault()
                              // this.props.getAllCustomers({token:this.props.token})
                              // this.props.getAllProducts({token:this.props.token, locId:loc._id})
                              this.setState({showAddOrder:true})
                            }} class="btn btn-icon btn-primary "><i class="far fa-edit"></i>Add Orders</a>
                          </div>
                        </div>
            </div>
            <AddCustomer  showAddCustomer={this.state.showAddCustomer} hideAddCustomer={() => this.setState({ showAddCustomer: false })}/>
            <AddOrder  showAddOrder={this.state.showAddOrder} hideAddOrder={() => this.setState({ showAddOrder: false })}/>
            <div class="section-body">
              <div class="row">
                <div class="col-12">
                  <div class="card">

                    <div class="card-body">
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

                      {this.props.loadingOrder?<div style={{width:'85%',textAlign: 'center'}}><Spin  /></div>:
                    this.props.orders.map((item,i)=>{
                      let {cart_id, customerName, customerPlace, customerPhoneno, salesName,products,status } = item
                      return(
                        <div id="order" class="color-gray" key={i} style={{ 
                          background: 'ghostwhite',
                          padding:15,
                          borderRadius: '2px',
                          display: 'inline-block',
                          margin: '1rem',
                          width:'100%',
                          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
                          }}>
                            <div class="row btn-top ">
    
                              <div class="col-6 col-sm-2 col-lg-2">
                                <p>  Order ID : {cart_id}</p>
                              </div>
                              <div class="col-6 col-sm-3 col-lg-3">
                                <p style={{ color: '#191d21'}}>Customer: {customerName}</p>
                              </div>
                              <div class="col-6 col-sm-4 col-lg-4">
                                Assigned Professional : <button class="btn  btn-light" type="button" >
                                 {salesName}
                          </button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" href="#">{salesName}</a>
                                </div>
                              </div>
                              <div class="col-6 col-sm-3 col-lg-3">
                                Status : <button class="btn  btn-light" type="button" >
                                  {status=='Assigned'?'Assigned':''}
                          </button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" href="" onClick={(e)=>e.preventDefault()}>Not Assign</a>
                                </div>
                              </div>
                            </div>
    
    
                            <div class="row btn-top">
    
                              <div class="col-12 col-sm-9 col-lg-9">
                                <p>   Location: {customerPlace}</p>
                              </div>
    
                              <div class="col-12 col-sm-3 col-lg-3">
                                Price : <b>$250 *static</b>
                              </div>
                            </div>
    
                            <div class="table-responsive btn-top"  >
                              <table class="table table-striped" id="table-1">
                                <thead>
                                  <tr>
    
                                    <th class="text-center">
    
                                    </th>
                                    <th>Service Name</th>
                                    <th>ml</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
    
                                    <th></th>
                                    <th></th>
    
    
                                  </tr>
                                </thead>
                                {
                                  products.map((dil, j)=>{
                                    let  { name, price, stock, desc} = dil
                                    return(
                                      <tbody key={j} >
                                      <tr>
                                        <td style={{padding:15}}>
        
                                          <img src="../dist/img/example-image-50.jpg" width="100" height="100" alt="Generic placeholder image" />
                                        </td>
                                        <td>{name}</td>
                                        <td>{price.split('/')[1]}</td>
        
                                        <td>&#x20B9;{price.split('/')[0]}</td>
                                        <td>
                                          <input type="text" class="form-control" readonly="" value={stock} />
                                        </td>
                                        <td> <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
                                        </td>
                                        <td>              <a class="btn btn-danger btn-action" data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i>Delete</a>
                                        </td>
        
        
        
                                      </tr>
                                    </tbody>
                                    )
                                  })
                                }
                              </table>
    
    
    
                            </div>
                          </div>
                      )
                    })}
                      {/* <div class="table-responsive">
                      <table class="table table-striped" id="table-1">
                        <thead>                                 
                          <tr>
                            
                            <th class="text-center">
                              #
                            </th>
                            <th>Service Name</th>
                            <th>Ordered Date and Time</th>
                            <th>Scheduled Date and Time</th>

                           <th>Company</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>

                          </tr>
                        </thead>
                        <tbody>                                 
                          <tr>
                            <td>
                              1
                            </td>
                            <td>Create a mobile app</td>
                           
                            <td>2018-01-20</td>
                            <td>2018-01-20</td>
                            <td>
                            <NavLink to="/Companylist">

                              <img alt="image" src="../dist/img/avatar/avatar-5.png" class="rounded-circle" width="35" data-toggle="tooltip" title="Wildan Ahdian" />
                            </NavLink>
                            </td>
                         
                            <td><div class="badge badge-success">Completed</div></td>
                            <td>$500</td>
                            <td>
                            <div class="card-header-action">

                            <a class="btn btn-secondary" data-toggle="collapse" href="#mycard-collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                           Show More
                             </a>                               
                           </div>
                           
                              </td>
                             
                          </tr>
                        <tr>
                        <td colspan="12" class="collapse show" id="mycard-collapse">
                    <div class="card-body">
                      You can show or hide this card.
                    </div>
                    </td>
                        </tr>


                           <tr>
                            <td>
                              2
                            </td>
                            <td>Redesign homepage</td>
                            
                            <td>2018-04-10</td>
                            <td>2018-04-10</td>

                            <td>
                            <NavLink to="/Companylist">
  <img alt="image" src="../dist/img/avatar/avatar-1.png" class="rounded-circle" width="35" data-toggle="tooltip" title="Nur Alpiana" /></NavLink>
                                 </td>
                            <td><div class="badge badge-info">Todo</div></td>
                            <td>$500</td>
                            <td>
                            <a class="btn btn-secondary" data-toggle="collapse" href="#mycard-collapse1" role="button" aria-expanded="false" aria-controls="collapseExample">
                           Show More
                             </a>                              
                              </td>

                          </tr> <tr>
                        <td colspan="12" class="collapse show" id="mycard-collapse1">
                    <div class="card-body">
                      You can show or hide this card.
                    </div>
                    </td>
                        </tr>
                      
                        </tbody>
                      </table>
                      

                    
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div style={{ marginLeft: 100, marginRight: 100 }}>
  <Card style={{ fontWeight: 700, fontSize: 20 }}>
    <Col span={6} style={{ borderRight: "0.5px solid #cccccc" }}>
      ORDER ID
    </Col>
    <Col span={6} style={{ borderRight: "0.5px solid #cccccc" }}>
      SERVICE NAME
    </Col>
    <Col span={6} style={{ borderRight: "0.5px solid #cccccc" }}>
      SERVICE STATUS
    </Col>
    <Col span={6}>STATUS</Col>
  </Card>
  <Expansionpanel />

</div> */}



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
  token: state.auth.token,
  orders: state.Order.allOrder,
  loadingOrder: state.Order.loadingOrder,
})

export default connect(mapStateToProps, { getAllOrders,getAllCustomers })(Orders)