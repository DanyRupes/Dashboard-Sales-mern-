import { LOADING_APP, DISPLAY_APP } from '../action/types'


const initState = {
     loadingApp:true
}


export default function async(state=initState, action) {
    switch (action.type) {
        case DISPLAY_APPPP:
            return { loading:false }  
        case LOADING_APP:
            return{ loading:true}    
        default :
            return {...state}
    }
}