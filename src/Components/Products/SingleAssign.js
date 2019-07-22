import React, { Component } from 'react';
import { getAllSales, assignProductsToSale } from '../../action/Sales_act'
import { connect } from 'react-redux';

class SingleAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignQuans: 0
        };
    }

    saleAssign = async ({ saleId, e }) => {
        e.preventDefault()

        let { stock, assignQuans } = this.state
        let { token } = this.props
        let { _id } = this.props.item
        
        let stk = parseInt(stock), assign= parseInt(assignQuans)
        console.log("Assign ", _id,stk, assign, token)

        this.props.assignProductsToSale({token,locId:'5cdbe8e4ddf3c255c89b90ad',prodId:_id, assign, saleId})



        this.setState({ assignQuans: '', stock: (stk-assign)>0?(stk-assign):0})
    }


    componentDidMount() {
        let { stock } = this.props.item
        this.setState({ assignQuans: 0, stock})
    }

    handleAssignChange = (e)=>{
    
        let value = parseInt(e.target.value)?parseInt(e.target.value):0
        let stk = parseInt(this.state.stock)
        // console.log(value, stk, parseInt(value) > parseInt(stk))
        if (value > stk ) { 
            alert('Please select quantity lesser than ' + stk);
            return
        }
        this.setState({ assignQuans: value})

}


    render() {
        const { name, price, _id, desc, location } = this.props.item

        return (
            <tr>
                <td>

                    <img src="../dist/img/example-image-50.jpg" width="100" height="100" alt="Generic placeholder image" />
                </td>
                <td>{name}</td>
                <td>{price.split('/')[1]}</td>

                <td>&#8377;{price.split('/')[0]}</td>
                <td>
                    <input type="text" class="form-control" readonly="" value={this.state.stock} />
                </td>
                <td>
                    <input type="text" style={{ fontSize: '14px' }} onChange={(e) => this.handleAssignChange(e)} class="form-control form-control-lg" value={this.state.assignQuans} />
                </td>
                <td>
                    <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Assign to
                      </button>
                    <div class="dropdown-menu">
                        {
                            this.props.sales.map((sal, i) => {
                                return (<a onClick={(e) => this.saleAssign({ saleId:sal._id, e })} key={i} class="dropdown-item" >{sal.name}</a>)
                            })
                        }
                    </div>
                </td>
                <td> <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i>Edit</a>
                </td>
                <td>              <a class="btn btn-danger btn-action" data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i>Delete</a>
                </td>
            </tr>

        );
    }
}


const mapStateToProps = (state) => ({
    token: state.auth.token,
    sales: state.Sales.allSales
})

export default connect(mapStateToProps, { getAllSales, assignProductsToSale })(SingleAssign)
