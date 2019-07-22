import {LOADING_CUSTOMER,DISPLAY_CUSTOMER,DISPLAY_SALE_CUSTOMER } from './types'
import axios from 'axios'
import {message } from  'antd'

export const getAllCustomers = ({token})=> async dispatch =>{
    
    dispatch({type:LOADING_CUSTOMER}) //loading
    let custom = await axios.get(`/allCustomer`,{headers:{token}})
        

    if(custom) {
        dispatch({
            type:DISPLAY_CUSTOMER,
            payload: custom.data.details
        })
    }
    else{
        console.log(custom.data)
        alert('Something went wrong')
    }
}

export const getSaleCustomers = ({customers})=> async dispatch =>{

    if(customers) {
        dispatch({
            type:DISPLAY_SALE_CUSTOMER,
            payload: customers
        })
    }
    else {
        dispatch({
            type:DISPLAY_SALE_CUSTOMER,
            payload: []
        })
    }
}