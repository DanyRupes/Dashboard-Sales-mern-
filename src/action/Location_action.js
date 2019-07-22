import { DISPLAY_LOCATION, LOADING_LOCATION, SELECTED_LOCATION} from './types'
import axios from 'axios'
import {message } from 'antd'
import { setSelectedLocationStatus} from '../local/main'



export const addLocation = ({token, city, location, pincode, locations}) => async dispatch => {
   
    if(token) {
        console.log("yes yes ", token, city, location, pincode, locations)
        let body = {
            "place":location,
            city,
            pincode
        }
        let loc = await axios.post('/addLocation',body,{headers:{token}})
        if(loc){
            console.log(loc.data)
            message.success('Location '+loc.data.details.place+" Created")
            dispatch({
                type: DISPLAY_LOCATION,
                payload:[loc.data.details, ...locations]
            })
        }
    }
    else  {
       alert('login')
       return 'login'
    }
}


export const allLocations = (token)=>async dispatch=>{
    if(token) {
        dispatch({type:LOADING_LOCATION})
        let loc = await axios.get('/viewLocation',{headers:{token}})
        if(loc){
            dispatch({
                type: DISPLAY_LOCATION,
                payload:loc.data.details
            })
            return 'fine'
        }
    }

}

export const selectLocation = (loc)=>async dispatch=>{ 
    if(!loc)
        return

    setSelectedLocationStatus({status:JSON.stringify(loc)})
        
        dispatch({
            type: SELECTED_LOCATION,
            payload:loc
        })

}
