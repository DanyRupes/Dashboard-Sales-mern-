import { CHECK_AUTH,AUTH_FALSE } from './types'
import Axios from 'axios';
import {setLoggedInTime } from '../local/main'
// import iziToast from 'izitoast'
// import { push } from 'react-router-redux'


export const getAuthToken = ()=> async dispatch =>{
    let token = await localStorage.getItem('lb_id_atk') //lubricant identity of admin token
    if(token) {
        // console.log("yes yes ", token)
        let isValid = await Axios.get('/adminAuthStatus',{headers:{token}})
        let message =  isValid.data.message
        if(message=='FINE'){
            // setLoggedInTime()
            
            dispatch({
                type: CHECK_AUTH,
                payload:{token, auth:true, ...isValid.data.details}
            })
            
            return token
        }
        else{
            // console.log(message)
            dispatch({type: AUTH_FALSE})
            return null
        } 


    }
    else  {
        // console.log("auth null")
        dispatch({type: AUTH_FALSE})
        return null
    }
}
export const loginAction = ({email, password}) => async dispatch => {
    Axios.post('/adminLogin',{
        email,
        password,
      }).then((res)=>{
        let {token, name } = res.data
          localStorage.setItem('lb_id_atk',token)    
          setLoggedInTime()          
            //   iziToast.success({
            //     title: 'Authendication',
            //     message:'Success',
            //     timeout: 1400,
            //     close: true,
            //     theme: 'light',
            //     color: '#2ecc71',
            //     displayMode: 'once',
            //     zindex: 1999,
            //     position:'topCenter'
            // });
            console.log("details", res.data)

            dispatch({
                type: CHECK_AUTH,
                payload:{token:token, auth:true}
            })

            // this.props.history.push('/')
      }).catch(err=>{
          console.log(err)
          dispatch({
            type: CHECK_AUTH,
            payload:{token:null, auth:false}
        })
            //     iziToast.error({
            //       title: 'Authendication Error',
            //       message:err.response.data.message,
            //       timeout: 1300,
            //       close: true,
            //       // overlay: true,
            //       theme: 'dark',
            //       color: '#d63031',
            //       displayMode: 'once',
            //       zindex: 1999,
            //       position:'topCenter'
            //   });
      })
}


export const navigateLogin = ()=>async dispatch =>{
    // dispatch(push('/login'))
}

// export const checkLoginState = ()=> async dispatch=>{
//     let 
// }