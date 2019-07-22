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
import { addProduct } from '../../../action/Product_act'
import { connect } from 'react-redux';


class AddProdModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ap_name: '', ap_price: '', ap_quantity: "", ap_image: "", ap_desc_type: 'ml', ap_desc: '',
            disableSubmit: true,
        };
    }


    resetState = ()=>this.setState({ap_name: '', ap_price: '', 
            ap_quantity: "", ap_image: "", ap_desc_type: 'ml', ap_desc: '',})

    componentDidMount() {
        // console.log(this.state)
    }

    handleOkAdd = () => {
        let { ap_name, ap_price, ap_quantity, ap_image, ap_desc, ap_desc_type } = this.state
        let { products, addProduct, token } = this.props

        if (!ap_name || !ap_price || !ap_quantity || !ap_desc || !ap_desc_type || !ap_image) {
            return
        }

        
        this.props.hideAddProduct()
        this.resetState()
        addProduct({ token, prodName: ap_name, description:ap_desc+" "+ap_desc_type,
             stock:ap_quantity, price:ap_price, products, image: ap_image})
    }



    render() {
        let { ap_name, ap_price, ap_quantity, ap_image, ap_desc, ap_desc_type } = this.state

        return (
            <Modal
                title="ADD PRODUCT"
                visible={this.props.showAddProduct}
                onOk={this.handleOkAdd}
                onCancel={() => {this.props.hideAddProduct();this.resetState()}}
                footer={[
                    <Button key="save" disabled={!ap_name || !ap_price || !ap_quantity || !ap_desc || !ap_desc_type || !ap_image ? true : false} type="primary" onClick={this.handleOkAdd}>
                        SAVE
          </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => {this.props.hideAddProduct();this.resetState()}}>
                        CANCEL
          </Button>,
                    <span style={{ marginRight: 100 }} />
                ]}
            >
                <form noValidate="" onSubmit={() => alert("wow")}>
                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" className="form-control form-control-sm"
                                name="name" tabIndex="1" required autoFocus
                                value={this.state.ap_name}
                                onChange={(e) => this.setState({ ap_name: e.target.value })} />
                            <div className="invalid-feedback">
                                fill Name
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="price">Price</label>
                            <input id="price" type="number" className="form-control form-control-sm"
                                name="price" tabIndex="1" required
                                value={this.state.ap_price}
                                onChange={(e) => this.setState({ ap_price: e.target.value })} />
                            <div className="invalid-feedback">
                                fill price
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="quan">Quantity</label>
                            <input id="quan" type="number" className="form-control form-control-sm"
                                name="quan" tabIndex="1" required
                                value={this.state.ap_quantity}
                                onChange={(e) => this.setState({ ap_quantity: e.target.value })} />
                            <div className="invalid-feedback">
                                fill Quantity
                            </div>
                        </div>

                    </div>


                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">Description</label>
                            <input type="text" className="form-control form-control-sm"
                                value={this.state.ap_desc} tabIndex="1"
                                type="number"
                                onChange={(e) => this.setState({ ap_desc: e.target.value })} />
                            <div className="invalid-feedback">
                                fill Quantity
                            </div>

                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputState">type</label>
                            <div className="form-control form-control-sm">
                            <select  id=""tabIndex="1" 
                                onChange={(e) => this.setState({ ap_desc_type: e.target.value })} value={this.state.ap_desc_type}>
                                <option>ml</option>
                                <option>litre</option>
                                <option>kilo</option>
                            </select>

                            </div>
                        </div>
                    </div>
                    

                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="ap_image">Upload Image</label>
                            <input id="ap_image" type="file" className="form-control"
                                name="image" tabIndex="1" required
                                accept="image/*"
                                //  value={this.state.ap_image}
                                onCh
                                onChange={(e) => {
                                    // console.log(e,document.getElementById('ap_image').files[0])
                                    this.setState({ ap_image: document.getElementById('ap_image').files[0]})}} />

                            <div className="invalid-feedback">
                                upload image
                            </div>
                        </div>
                    </div>
                </form>

            </Modal>
        );
    }
}

const mapStateToPRops = (State) => ({
    token: State.auth.token,
    products: State.Products.details,
})
export default connect(mapStateToPRops, { addProduct })(AddProdModel)