import { DISPLAY_PRODUCTS, LOAD_PRODUCTS } from '../action/types'


const initState = {
    details: [], loadingProducts:true
}


export default function async(state=initState, action) {
    switch (action.type) {
        case DISPLAY_PRODUCTS:
            return {  details: action.payload,loadingProducts:false }
        case LOAD_PRODUCTS:
            return {...state, loadingProducts:true}    
        default :
            return {...state}
    }
}