import { DISPLAY_SALES,LOADING_SALES } from './types'
import axios from 'axios'
import {message } from  'antd'

export const getAllSales = ({token, locId})=> async dispatch =>{
    
    dispatch({type:LOADING_SALES}) //loading
    var sales
        if(!locId)
        sales = await axios.get(`/allSales`,{headers:{token}})
        
        else
        sales= await axios.get(`/allSales?locationId=${locId}`,{headers:{token}})
    
    // console.log("sales.data--------", sales.data)
    if(sales) {
        dispatch({
            type:DISPLAY_SALES,
            payload: sales.data.details
        })
    }
    else{
        console.log(sales.data)
        alert('Something went wrong')
    }
}



export const addCustomer = ({token, locId,saleId,name,email,phoneno,address,place, city,pincode,allSales})=> async dispatch =>{

    // dispatch({type:LOADING_SALES}) //loading

    let custom = await axios.post(`/addCustomer?salesId=${saleId}&name=${name}&email=${email}&phoneno=${phoneno}&address=${address}&place=${place}&city=${city}&pincode=${pincode}`,{},{headers:{token}})
    if(custom) {
        
        let newCustomer = custom.data.details
        
        let finalSale = await allSales.map(sal=>{
            if(sal._id == saleId) {
                sal.customers.push(newCustomer)
                return sal
                }
            else return sal
        })
        if(finalSale){
            message.success(name+' created')
            dispatch({
                type:DISPLAY_SALES,
                payload: finalSale
            })
        }
    }
    else{
        console.log(custom.data)
        alert('Something went wrong')
    }
}

export const assignProductsToSale = ({token,locId,prodId, assign, saleId })=> async dispatch =>{
    if(!token) {alert('Please Login to Continue');return}
        getAllSales()
        message.success('Assigned '+assign)
    // console.log(locId,prodId, assign, saleId)
    // let sales = await axios.post(`/assignProducts?locationId=${locId}&productId=${prodId}&stockAssigned=${assign}&salesId=${saleId}`,{},{headers:{token}})
    // if(sales) {
    //     console.log(sales.data)
    // }
    // else{
    //     console.log(sales.data)
    //     alert('Something went wrong')
    // }
}

export const createSale = ({ token,name,city,phoneno,address,place, allSales})=> async dispatch =>{

    // dispatch({type:LOADING_SALES}) //loading

    // console.log(token,name,phoneno,address,"-----_____------",place,city,allSales)

    let sale = await axios.post(`/addSalesPerson?name=${name}&phoneno=${phoneno}&address=${address}&place=${place}&city=${city}`,{},{headers:{token}})
    if(sale) {
        let newSale = sale.data.details
        newSale['customers'] = []
        // console.log([ ...allSales,newSale])
            message.success(name+' created')
            dispatch({
                type:DISPLAY_SALES,
                payload: [newSale, ...allSales]
            })
    }
    else{
        console.log(sale.data)
        alert('Something went wrong')
    }
}