import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {END_POINT} from '../constants/index'
const exaple = () => {
    const orderProduct = () => {
        axios({
         method:"GET",
         url:`${END_POINT}/orders?status=CART`,
         headers:{
             authorization:localStorage.getItem("userToken")
         }
        }).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
   
    return (
        <div>
            
        </div>
    )
}

export default exaple
