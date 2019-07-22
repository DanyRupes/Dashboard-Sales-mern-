import { DISPLAY_LOCATION, LOADING_LOCATION, SELECTED_LOCATION } from '../action/types'



const initState = {
    locations: [], loadingLocation: true, selectedLocation: {'place':'place','city':'city'}
}





export default  function  (state = initState, action) {
    switch (action.type) {
        case DISPLAY_LOCATION:
            return { ...state, locations: action.payload, loadingLocation: false, }
        case LOADING_LOCATION:
            return { ...state, loadingLocation: true }
        case SELECTED_LOCATION:
            return { ...state, selectedLocation: action.payload }
        default:
            return { ...state }
    }
}

