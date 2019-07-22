import { DISPLAY_ORDERS, LOADING_ORDERS } from './types'
import axios from 'axios'
import {message } from  'antd'

export const getAllOrders = ({token})=> async dispatch =>{
    
    dispatch({type:LOADING_ORDERS}) //loading

    let order = await axios.get(`/allOrders`,{headers:{token}})
    if(order) {
        // console.log(order.data.details)
        dispatch({
            type:DISPLAY_ORDERS,
            payload: order.data.details
        })
    }
    else{
        console.log(order.data)
        alert('Something went wrong')
    }
}


export const createOrder = ({ token,phoneno, productId, customerId,quantity,locationId,orders})=> async dispatch =>{

    // dispatch({type:LOADING_SALES}) //loading


    let sale = await axios.post(`/addOrder?productId=${productId}&customerId=${customerId}&scheduleDate=21/5/19&scheduleTime=1-2 pm&quantity=${quantity}&locationId=${locationId}`,{},{headers:{token}})
    if(sale) {
        // console.log(sale.data)
        let newSale = sale.data.details
        // newSale['customers'] = []
        console.log(newSale)
            message.success('Order created')
            dispatch({
                type:DISPLAY_ORDERS,
                payload: [newSale, ...orders]
            })
    }
    else{
        console.log(sale.data)
        alert('Something went wrong')
    }
}