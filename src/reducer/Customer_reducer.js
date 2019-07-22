import { DISPLAY_CUSTOMER, LOADING_CUSTOMER, DISPLAY_SALE_CUSTOMER} from '../action/types'

const initialState = {
    allCustomer: [], loadingCustomer:true, saleCustomers:[]
}


export default function async(state=initialState, action){
    switch(action.type){
        case DISPLAY_CUSTOMER : 
            return  { allCustomer:action.payload, loadingCustomer:false } 
        case LOADING_CUSTOMER:
                return {...state, loadingCustomer:true}     
        case DISPLAY_SALE_CUSTOMER:
                return {...state,saleCustomers:action.payload, loadingCustomer:false}     
        default : 
            return {...state}
    }
}