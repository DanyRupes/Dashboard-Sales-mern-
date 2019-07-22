import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editProduct } from '../../action/Product_act'
class SingleProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: 0
    };
  }

  componentDidMount() {
    //   console.log(this.)
    this.setState({ stock: this.props.item.stock })
  }

  componentWillReceiveProps(props) {
    this.setState({ stock: props.item.stock })
  }

  handleEditClick = async ({ _id }) => {
    let { stock, } = this.state
    let { auth, products } = this.props
    this.props.editProduct({ product_id: _id, stock, token: auth, products })
  }
  render() {
    const { name, price, stock, _id, desc, location } = this.props.item
    return (
      <tr>
        <td>
          <img src="../dist/img/example-image-50.jpg" width="100" height="100" alt="Generic placeholder image" />
        </td>
        <td>{name}</td>
        <td>{price.split('/')[1]}</td>

        <td>&#8377;{price.split('/')[0]}</td>
        <td>
          <input type="text" class="form-control" readonly={false} onChange={(e) => this.setState({ stock: e.target.value })} value={this.state.stock} contentEditable={true} />
        </td>
        <td> <a onClick={() => this.handleEditClick({ _id })} class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
        </td>
        <td>              <a class="btn btn-danger btn-action" data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i>Delete</a>
        </td>
      </tr>

    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth.token,
  products: state.Products.details
})
export default connect(mapStateToProps, { editProduct })(SingleProfile)