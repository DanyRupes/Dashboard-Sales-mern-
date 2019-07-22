import { DISPLAY_ORDERS, LOADING_ORDERS} from '../action/types'

const initialState = {
    allOrder: [], loadingOrder:true
}


export default function async(state=initialState, action){
    switch(action.type){
        case DISPLAY_ORDERS : 
        // console.log("displayyyy ordes..............")
            return  { allOrder:action.payload, loadingOrder:false } 
        case LOADING_ORDERS:
                return {...state, loadingOrder:true}     
        default : 
            return {...state}
    }
}