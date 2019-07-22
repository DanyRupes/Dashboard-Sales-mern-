import React, { Component } from 'react';
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
import { addLocation } from '../../../action/Location_action'
import { addCustomer } from '../../../action/Sales_act'
import { connect } from 'react-redux';


class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',email:'',phoneno:'',address:'',place:'',
            disableSubmit: true,
        };
    }


    resetState = ()=>this.setState({name:'',email:'',phoneno:'',address:'',place:'',})

    componentDidMount() {
        // console.log(this.state)
    }

    handleOkAdd = () => {
        let { name,email,phoneno,address,place, city,pincode} = this.state
        let {sales,addCustomer, token} = this.props
        let {_id ,customers } = this.props.selectedSale

        let locId = this.props.selectedLocation._id
        if ( !name||  !phoneno|| !address|| !place|| !city|| !pincode ) {
            return
        }

        // console.log(saleId,name,email,phoneno,address,place, city,pincode)
        
        this.props.hideAddCustomer()
        this.resetState()
        addCustomer({ token, locId,saleId:_id,name,email:email?email:'no',phoneno,address,place, city,pincode, allSales:sales})
    }

    componentWillReceiveProps(props){
        if(props.selectedSale){
            let { city, place, pincode } = props.selectedSale
            this.setState({place, city, pincode})
        }
    }



    render() {
        // console.log("props.selectedSale",this.props.selectedSale)
        let { name,email,phoneno,address,place, city,pincode } = this.state
        return (
            <Modal
                title="ADD CUSTOMER"
                visible={this.props.showAddCustomer}
                onOk={this.handleOkAdd}
                onCancel={() => {this.props.hideAddCustomer();this.resetState()}}
                footer={[
                    <Button key="save" disabled={ !name|| !phoneno|| !address|| !place|| !city|| !pincode ? true : false} type="primary" onClick={this.handleOkAdd}>
                        SAVE
          </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => {this.props.hideAddCustomer();this.resetState()}}>
                        CANCEL
          </Button>,
                    <span style={{ marginRight: 100 }} />
                ]}
            >
                <form noValidate={false}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label >Name</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })} />

                        </div>
                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input  type="email" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })} />

                        </div>
                    </div>
                    <div class="form-row">
                    <div className="form-group col-md-12">
                            <label >Address</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.address}
                                onChange={(e) => this.setState({ address: e.target.value })} />

                        </div>
                        </div>
                    <div class="form-row">
                    <div className="form-group col-md-6">
                            <label >Place</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.place}
                                contentEditable={false}
                                disabled={true}
                                // onChange={(e) => this.setState({ place: e.target.value })}
                                 />

                        </div>
                        <div className="form-group col-md-6">
                            <label >City</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.city}
                                contentEditable={false}  
                                disabled={true}
                                // onChange={(e) => this.setState({ city: e.target.value })}
                                 />

                        </div>
                    </div>


                    <div class="form-row">
                    <div className="form-group col-md-6">
                            <label >Pincode</label>
                            <input  type="number" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.pincode}
                                disabled={true}
                                // onChange={(e) => this.setState({ pincode: e.target.value })}
                                 />

                        </div>
                        <div className="form-group col-md-6">
                            <label >phoneNo</label>
                            <input  type="number" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.phoneno}
                                onChange={(e) => this.setState({ phoneno: e.target.value })} />

                        </div>
                    </div>
                </form>

            </Modal>
        );
    }
}

const mapStateToPRops = (state) => ({
    token: state.auth.token,
    // products: State.Products.details,
    sales: state.Sales.allSales,
    locations: state.Location.locations,
  selectedLocation: state.Location.selectedLocation

})
export default connect(mapStateToPRops, { addLocation,addCustomer })(AddCustomer)