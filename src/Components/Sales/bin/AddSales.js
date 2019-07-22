import React, { Component } from 'react';
import {
    Button,
    Modal,
} from "antd";
import { createSale } from '../../../action/Sales_act'
import { connect } from 'react-redux';
import LocationHead from '../../reuse/LocationHead';


class AddSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', phoneno: '', address: '',
            disableSubmit: true,
        };
    }


    resetState = () => this.setState({ name: '', phoneno: '', address: '',  })

    componentDidMount() {
        // console.log(this.state)
        
    }

    handleOkAdd = () => {
        let {name, phoneno, address, } = this.state
        let { sales, createSale, token,selectedLocation } = this.props
        let {city, place } = selectedLocation

        if (!name || !phoneno || !address || !place || !city ) {
            return
        }

        // console.log(name, phoneno, address,place, city)

        this.props.hideAllSale()
        this.resetState()
        createSale({ token,city,place,name, phoneno, address, allSales: sales })
    }





    componentWillReceiveProps(props){
        // console.log("receiving...",)
   
    }

    render() {
        let { name, phoneno, address} = this.state
        // console.log(selectedPlace)
 
        return (
            <Modal
                title="ADD SALES PERSON"
                visible={this.props.showAddSale}
                onOk={this.handleOkAdd}
                onCancel={() => { this.props.hideAllSale(); this.resetState() }}
                footer={[
                    <Button key="save" disabled={!name || !phoneno || !address ? true : false} type="primary" onClick={this.handleOkAdd}>
                        SAVE
          </Button>,
                    <span style={{ marginRight: 100 }} />,
                    <Button key="cancel" onClick={() => { this.props.hideAllSale(); this.resetState() }}>
                        CANCEL
          </Button>,
                    <span style={{ marginRight: 100 }} />
                ]}
            >
                <form noValidate={false}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label >Name</label>
                            <input type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })} />

                        </div>
                        <div className="form-group col-md-6">
                            <label >PhoneNo</label>
                            <input type="number" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.phoneno}
                                onChange={(e) => this.setState({ phoneno: e.target.value })} />

                        </div>
                    </div>
                    <div class="form-row">
                        <div className="form-group col-md-12">
                            <label >Address</label>
                            <input type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.address}
                                onChange={(e) => this.setState({ address: e.target.value })} />

                        </div>
                    </div>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            {/* <div class="dropdown d-inline mr-2">
                                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {sel_place.city} ({sel_place.place
                                    })                                                 </button>
                                <div class="dropdown-menu">{
                                    this.props.Locations.map((loc, i) => {
                                        return (
                                            <a key={i} class="dropdown-item" onClick={(e) => this.handleLocClick(e, loc)} href="">{loc.city} ({loc.place})</a>
                                        )
                                    })
                                }
                                </div>
                            </div> */}
                            {/* <label >Place</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.place}
                                onChange={(e) => this.setState({ place: e.target.value })} /> */}

                        </div>
                        {/* <div className="form-group col-md-6">
                            <label >City</label>
                            <input  type="text" className="form-control form-control-sm"
                                tabIndex="1" required autoFocus
                                value={this.state.city}
                                onChange={(e) => this.setState({ city: e.target.value })} />

                        </div> */}
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
    Locations: state.Location.locations,
    selectedLocation: state.Location.selectedLocation

})
export default connect(mapStateToPRops, { createSale })(AddSales)