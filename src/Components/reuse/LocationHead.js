import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import {allLocations, selectLocation  } from '../../action/Location_action'

class LocationHead extends Component {
    constructor(props) {

        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }

    render() {
    let { place, city } = this.props.selectedLocation

        return (
            <div class="dropdown d-inline mr-2">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {city} ({place})                                                 </button>
                <div class="dropdown-menu">{
                    this.props.loadingLocation ? <Spin size="small" /> :
                        this.props.Locations.map((loc, i) => {
                            return (
                                <a key={i} class="dropdown-item" onClick={(e) => this.props.handleLocClick(e, loc)} href="">{loc.city} ({loc.place})</a>
                            )
                        })
                }
                </div>
            </div>
        );
    }
} // 

const mapStateToProps = (state) => ({
    token: state.auth.token,
    Locations: state.Location.locations,
    selectedLocation: state.Location.selectedLocation,
    loadingLocation: state.Location.loadingLocation,
  })
  
  export default connect(mapStateToProps,{allLocations, selectLocation })(LocationHead)
