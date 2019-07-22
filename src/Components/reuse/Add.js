import React, { Component } from 'react';


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let { title } = this.props
        return (
            <div class="col-4 col-sm-4 col-lg-3">
                <div class="buttons">
                    <a onClick={(e)=>{
                        this.props.handleAddClick(e,this.props.set)}} href="" class="btn btn-icon btn-primary"><i class="far fa-edit"></i>{title}</a>
                </div>
            </div>
        );
    }
}
