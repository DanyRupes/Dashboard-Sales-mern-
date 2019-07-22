import { DISPLAY_SALES,LOADING_SALES} from '../action/types'

const initialState = {
    allSales: [], loadingSale:true
}


export default function async(state=initialState, action){
    switch(action.type){
        case DISPLAY_SALES : 
            return  { allSales:action.payload, loadingSale:false } 
        case LOADING_SALES:
                return {...state, loadingSale:true}     
        default : 
            return {...state}
    }
}