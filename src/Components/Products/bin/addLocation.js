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
import { connect } from 'react-redux';


class AddLocModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city:'', location:'', pincode:'',
            disableSubmit: true,
        };
    }


    resetState = ()=>this.setState({city:'', location:'', pincode:''})

    componentDidMount() {
        // console.log(this.state)
    }

    handleOkAdd = () => {
        let { city, location, pincode} = this.state
        let { locations, addLocation, token } = this.props

        if (!city || !location || !pincode ) {
            return
        }

        
        this.props.hideAddLocation()
        this.resetState()
        addLocation({ token, city, location, pincode, locations})
    }



    render() {
        let { city, location, pincode } = this.state

        return (
            <Modal
                title="ADD LOCATION"
                visible={this.props.showAddLocation}
                onOk={this.handleOkAdd}
                onCancel={() => {this.props.hideAddLocation();this.resetState()}}
                footer={[
                    <Button key="save" disabled={!city || !location || !pincode ? true : false} type="primary" onClick={this.handleOkAdd}>
                        SAVE
          </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => {this.props.hideAddLocation();this.resetState()}}>
                        CANCEL
          </Button>,
                    <span style={{ marginRight: 100 }} />
                ]}
            >
                <form noValidate={false}>
                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="city">City</label>
                            <input id="city" type="text" className="form-control form-control-sm"
                                name="city" tabIndex="1" required autoFocus
                                value={this.state.city}
                                onChange={(e) => this.setState({ city: e.target.value })} />

                        </div>
                    </div>
                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" className="form-control form-control-sm"
                                name="location" tabIndex="1" required
                                value={this.state.location}
                                onChange={(e) => this.setState({ location: e.target.value })} />

                        </div>
                    </div>


                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="pincode">Pincode</label>
                            <input type="text" name="pincode" className="form-control form-control-sm"
                                value={this.state.pincode} tabIndex="1"
                                type="number"
                                onChange={(e) => this.setState({ pincode: e.target.value })} />

                        </div>
                    </div>
                </form>

            </Modal>
        );
    }
}

const mapStateToPRops = (State) => ({
    token: State.auth.token,
    // products: State.Products.details,
    locations: State.Location.locations
})
export default connect(mapStateToPRops, { addLocation })(AddLocModel)