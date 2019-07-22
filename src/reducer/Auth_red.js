import { CHECK_AUTH,AUTH_FALSE } from '../action/types'


const initState = {
    token: '', auth: false,loadingApp:true, loguname:'',logemail:''
}


export default function async(state=initState, action) {
    switch (action.type) {
        case CHECK_AUTH:
            let { name, email } = action.payload
            // console.log(action.payload)
            return { token:action.payload.token, auth:action.payload.auth,loadingApp:false,loguname:name, logemail:email  }
        case AUTH_FALSE:
            return { auth:false, loadingApp:false}
        default :
            return {...state}
    }
}