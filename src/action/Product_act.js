import { DISPLAY_PRODUCTS,LOAD_PRODUCTS } from './types'
import axios from 'axios'
import { push } from 'react-router-redux'
import {message } from 'antd'




export const getAllProducts = ({token, locId}) => async dispatch =>{

    dispatch({type: LOAD_PRODUCTS})
    if(token) {
        let out = await axios.get(`/allProductbyLocation?locationId=${locId}`, {headers:{token}})
        if(out) {
            // console.log("out.data---",out.data)
            dispatch({
                type: DISPLAY_PRODUCTS,
                payload: out.data.details
            })
            return out.data.token
        }
    }
    else{ 
       
        // return null
        // dispatch(push('/login'))
        // alert("Please login")
    }
}

export const editProduct = ({product_id, stock, token, products}) => async dispatch =>{
    console.log(product_id, stock, token, products)

    // dispatch({type: LOAD_PRODUCTS})
    if(token) {
        let out = await axios.put(`/editProduct?productId=${product_id}&stock=${stock}`,{}, {headers:{token}})
        if(out) {
            if(out.data.details) {
                let allProd = await products.filter(i=>i._id!=product_id)
                console.log("out.data---",out.data)
                console.log("out.data---",[out.data.details,...allProd])
                dispatch({
                    type: DISPLAY_PRODUCTS,
                    payload: [out.data.details,...allProd]
                })
            }
            else {
                console.log(out.data)
                alert('Something went Wrong')
            }
        }
    }
    else{ 
        alert('Login to continue')
    }
}

// add product
export const addProduct = ({token, prodName, description,stock, price, products, image}) => async dispatch =>{

    // dispatch({type: LOAD_PRODUCTS})

    if(token) {
        let file = new FormData()
        file.append('image_url', image)
        let out = await axios.post(`/addProduct?name=${prodName}&desc=${description}&stock=${stock}&price=${price}`, file,{headers:{token}})
        if(out) {
            console.log("out.data---",out.data)
         

            dispatch({
                type: DISPLAY_PRODUCTS,
                payload: [out.data.details, ...products]
            })
            message.success('Product '+prodName+" Created")
            return out.data.token
        }
    }
    else{
        // return null
        // dispatch(push('/login'))
        alert("Please login")
    }
}