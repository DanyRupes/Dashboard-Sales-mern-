import React, { Component } from 'react';
import {
    Button,
    Modal,
    Spin,
} from "antd";
import { createOrder } from '../../../action/Orders_action'
import { selectLocation } from '../../../action/Location_action'
import { getAllProducts } from '../../../action/Product_act'
import { getSaleCustomers } from '../../../action/Customer_action'
import { connect } from 'react-redux';
import SingleProduct from '../../Products/SingleProduct';
import Spinning from '../../reuse/Spinning';
import LocationHead from '../../reuse/LocationHead';
import ListSingleproduct from './ListSingleproduct';
import Axios from 'axios';



class AddOrder extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        selectedCustomer: { name: 'select' },
        selectedSales: { name: 'select' },
        addedProducts: [],

        saleId: '',
        disableSubmit: true, allProductChecked: false, showListProducts: false,
        disableSubmitProduct: true
    };


    resetState = () => this.setState({ name: '', address: '', })

    componentDidMount() {
        // console.log(this.state)

    }

    handleOkAdd = async () => {

        let {  selectedCustomer, selectedSales, addedProducts } = this.state
        // let { orders, createOrder, token } = this.props

        let quantity = await addedProducts.map(it => it.stock)
        let productId = await addedProducts.map(it => it._id)
        let customerId = selectedCustomer._id
        let locationId = selectedCustomer.locationId
        let salesId = selectedSales._id



        this.props.createOrder({
            token: this.props.token, productId, customerId, quantity, salesId,
            orders: this.props.orders,locationId
        })
        this.props.hideAddOrder()
    }

    setSelectedCustomer = async (custom) => {
        console.log(custom)

        let locData = await Axios.get('/getCustomerLocation?customerId='+custom._id,{headers:{token:this.props.token}})
        if(locData) {
            let locationId = locData.data.details.locationId
            let customData = {...custom, locationId}
            console.log(customData)
            this.setState({ selectedCustomer: customData })
            
        }
    }


    setSelectedSale = (item) => {
        console.log("setSelect...")

        this.setState({ selectedSales: item,selectedCustomer:{name:'select'} })
        this.props.getSaleCustomers({ customers: item.customers })
    }
    componentWillReceiveProps(props) {
        // console.log("receiving...",this.state)

    }

    handleLocClick = (e, loc) => {
        e.preventDefault()
        this.props.selectLocation(loc)
        this.props.getAllProducts({ token: this.props.token, locId: loc._id })
    }

    handleCheckProduct = async ({ add_or_remove, keyValue, id, quan }) => {

        console.log(keyValue, add_or_remove)

        if (add_or_remove == 'add') { //adding id
            this.setState({ addedProducts: [...this.state.addedProducts, { keyValue, id, quan }], disableSubmitProduct: false })
        }
        else { //removing id
            this.setState({ addedProducts: await this.state.addedProducts.filter(it => it.keyValue != keyValue) })
            if (this.state.addedProducts.length < 1)
                this.setState({ disableSubmitProduct: true })
        }

    }

    handleProductSave = async () => {

        if (this.state.allProductChecked) {
            this.setState({ addedProducts: await this.props.products.map((item, i) => i), disableSubmitProduct: false })
        }
        // else {
        //     // this.setState({ addedProducts: [],  })
        // }
        // console.log(this.state.addedProducts)

        var fineProd = await this.state.addedProducts.map((item, i)=>{
            return {...this.props.products[item.keyValue], stock:item.quan}
        })

        let finalProducts =await Promise.all(await fineProd.filter(dick=>dick.stock!=undefined))
        console.log(finalProducts)
        this.setState({showListProducts:false, addedProducts:finalProducts})
    }

    setProductQuantity = async ({ quan, id, keyValue }) => {
        let addedProducts = this.state.addedProducts
        let fineProd = await addedProducts.map((item, i) => {
            if (keyValue == item.keyValue) {
                return { keyValue, quan, id }
            }
            else {
                return item
            }
        })

        this.setState({ addedProducts: fineProd })

    }

    render() {
     

        return (
            <Modal
                title="ADD ORDER"
                visible={this.props.showAddOrder}
                onOk={this.handleOkAdd}
                onCancel={() => { this.props.hideAddOrder(); this.resetState() }}
                footer={[
                    <Button key="save" disabled={this.state.selectedCustomer.name=='select' ||
                    this.state.addedProducts.length<1?true:false} type="primary" onClick={this.handleOkAdd}>
                        SAVE
          </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => { this.props.hideAddOrder(); this.resetState() }}>
                        CANCEL
          </Button>,
                    <span style={{ marginRight: 100 }} />
                ]}
            >
                <form noValidate={false}>
                    <div class="form-row">
                        <div className="form-group col-md-12" style={styles.dropContainer}>
                            <label style={styles.dropLabel}>Sales Person</label>
                            <button style={styles.dropLabel} class="btn  dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.selectedSales.name}
                            </button>
                            <div class="dropdown-menu">
                                {
                                    this.props.sales.map((item, i) => {
                                        return (
                                            <a style={{ textAlign: "center" }} onClick={(e) => {
                                                e.preventDefault()
                                                this.setSelectedSale(item)
                                            }} key={i} class="dropdown-item" href="">{item.name}</a>
                                        )
                                    })
                                }
                            </div>
                        </div>


                        <div className="form-group col-md-12" style={styles.dropContainer}>
                            <label style={styles.dropLabel}>Customers</label>
                            <button
                                disabled={this.state.selectedSales.name != 'select' ? false : true}
                                style={styles.dropLabel} class="btn  " type="button" id="dropdownMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                {this.state.selectedCustomer.name}
                            </button>
                            <div class="dropdown-menu">
                                {
                                    this.props.loadingCustomer ? <Spin /> :
                                        this.props.saleCustomers.map((custom, i) => {
                                            return (
                                                <a style={{ textAlign: "center" }} onClick={(e) => {
                                                    e.preventDefault()
                                                    this.setSelectedCustomer(custom)
                                                }} key={i} class="dropdown-item" href="">{custom.name}</a>
                                            )
                                        })
                                }

                            </div>
                        </div>

                        <div className="form-group col-md-12" style={styles.dropContainer}>
                            <label style={styles.dropLabel}>Products</label>
                            <button onClick={() => this.setState({ showListProducts: true })} style={styles.dropLabel} class="btn  dropdown-toggle" type="button" >
                                {this.state.addedProducts.length > 0 ? this.state.addedProducts.length + ' Products added' : 'select'}
                            </button>
                        </div>
                    </div>


                </form>
                <Modal
                    title={<div style={{ display: 'flex', flexDirection: 'row' }}>

                        <h5 style={{ flex: 1 }}>SELECT PRODUCTS</h5>
                        <div style={{ flex: 1 }}>
                            <LocationHead handleLocClick={this.handleLocClick} />

                        </div>
                    </div>}
                    width='calc(74%)'
                    height="600px"
                    visible={this.state.showListProducts}
                    onOk={this.handleProductSave}
                    onCancel={() => { this.setState({ showListProducts: false }) }}
                    footer={[<Button key="save" disabled={this.state.disableSubmitProduct ? true : false} type="primary" onClick={this.handleProductSave}>
                        SAVE
              </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => { this.setState({ showListProducts: false }) }}>
                        CANCEL
              </Button>,
                    <span style={{ marginRight: 100 }} />

                    ]}
                >

                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-12">
                            <div class="card">
                                <div class="card-body">

                                    <div class="table-responsive">
                                        <table class="table table-striped" id="table-1">
                                            <thead>
                                                <tr>

                                                    <th class="text-center">
                                                        <div class="custom-checkbox custom-control">
                                                            <input onClick={(e) => {
                                                                this.setState({ allProductChecked: !this.state.allProductChecked, disableSubmitProduct: !this.state.disableSubmit })
                                                            }} type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" class="custom-control-input" id="checkbox-all" />
                                                            <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                                                        </div>
                                                    </th>
                                                    <th class="text-center">Image</th>
                                                    <th>Service Name</th>
                                                    <th>ml</th>
                                                    <th>Price</th>
                                                    <th>Available</th>
                                                    <th>Quantity</th>

                                                    <th></th>


                                                </tr>
                                            </thead>
                                            {
                                                this.props.loadingProducts ?
                                                    <Spinning /> :
                                                    <tbody>
                                                        {
                                                            this.props.products.map((item, i) => {
                                                                return <ListSingleproduct setProductQuantity={this.setProductQuantity}
                                                                    keyValue={i} handleCheckProduct={this.handleCheckProduct} allProductChecked={this.state.allProductChecked} key={i} item={item} />
                                                            })
                                                        }
                                                    </tbody>

                                            }
                                        </table>
                                    </div>
                                </div>
                            </div></div>
                    </div>
                </Modal>
            </Modal>
        );
    }
}

const mapStateToPRops = (state) => ({
    token: state.auth.token,
    sales: state.Sales.allSales,
    allCustomers: state.Customer.allCustomer,
    saleCustomers: state.Customer.saleCustomers,
    loadingCustomer: state.Customer.loadingCustomer,
    products: state.Products.details,
    loadingProducts: state.Products.loadingProducts,
    orders: state.Order.allOrder,

})

const styles = {
    dropContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dropLabel: {
        flex: 1
    }
}
export default connect(mapStateToPRops, { createOrder, selectLocation, getAllProducts, getSaleCustomers })(AddOrder)