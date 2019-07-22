import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editProduct } from '../../../action/Product_act'
class ListSingleproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: 0,selectedQuantity:0,allProductChecked:false, isChecked:false
        };
    }

    componentDidMount() { //allProductChecked
        //   console.log(this.props)
        // this.setState({ stock: this.props.item.stock })
    }

    componentWillReceiveProps(props) {

        this.setState({ allProductChecked: props.allProductChecked })
    }

    

    handleEditQuan =  (e) => {
        let quan = parseInt(e.target.value)?parseInt(e.target.value):0, stock= parseInt(this.props.item.stock)
        if(quan>stock) { alert('Please select quantity lesser than ' + stock);return}
        this.setState({ selectedQuantity: quan })
        let { item, keyValue } = this.props
        this.props.setProductQuantity({quan, id:item._id, keyValue})
    }

    render() {
        const { name, price, stock, _id, desc, location } = this.props.item
        const { allProductChecked, keyValue } = this.props
        // console.log(keyValue)
        return (
            <tr>
                <th class="text-center">
                    <div class="custom-checkbox custom-control">

                        <input 
                        
                        checked={allProductChecked?true:this.state.isChecked?true:false}
                        onClick={(e) => {
                            let isAlreadyChecked = this.state.isChecked
                            this.setState({selectedQuantity: isAlreadyChecked?0:this.state.selectedQuantity,isChecked:!this.state.isChecked, })
                            this.props.handleCheckProduct({keyValue:keyValue, add_or_remove:this.state.isChecked?'remove':'add',
                            id:_id, quan:this.state.selectedQuantity})}
                            } 
                            type="checkbox" 
                            class="custom-control-input"
                            id={_id}/>
                        <label for={_id} class="custom-control-label">&nbsp;</label>
                    </div>
                </th>
                <td>
                    <img src="../dist/img/example-image-50.jpg" width="100" height="100" alt="Generic placeholder image" />
                </td>
                <td>{name}</td>
                <td>{price.split('/')[1]}</td>

                <td>&#8377;{price.split('/')[0]}</td>
                <td>{stock}</td>
                <td>
                    {
                        this.state.isChecked?
                        <input type="text" class="form-control" readonly={false} onChange={this.handleEditQuan}
                        value={this.state.selectedQuantity} contentEditable={true} />:
                        <div />
                    }
                </td>

                {/* <td> <a onClick={() => this.handleEditClick({ _id })} class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
                </td> */}
                {/* <td>              <a class="btn btn-danger btn-action" data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')">
                    <i class="fas fa-trash"></i>Delete</a>
                </td> */}
            </tr>

        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth.token,
    products: state.Products.details
})
export default connect(mapStateToProps, { editProduct })(ListSingleproduct)