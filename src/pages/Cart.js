import React,{useState,useEffect} from "react";
import { Container, Button,Table } from 'react-bootstrap'
import CartRow from "../components/CartRow";
import axios from 'axios'
import {END_POINT} from '../constants/index'
export const Cart = () => {
  const [cartProduct, setCartProduct] = useState([])
// get order
   const getOrders = () => {
    axios({method:"GET",url:`${END_POINT}/orders?status=CART`, headers:{
      authorization: JSON.parse(localStorage.getItem("userToken")),
  }})
    .then((res) => {
      const data = res.data
      setCartProduct(data)
    }).catch((error) => {
      console.log(error)
    })
   }
   useEffect(() => {
     getOrders()
   },[])

// Function orderNow
const orderNow = () => {
  
}

  return (
    <Container className="mt-5">
      <Table  bordered>
        <thead>
          <tr>
            <th>
              ຮູບພາບ
            </th>
            <th>
              ລາຍລະອຽດ
            </th>
            <th>             
             ຈຳນວນ
            </th>
          </tr>
        </thead>
       <tbody>
         {
           cartProduct.length > 0 && cartProduct.map((data, index)=>{
             return(
               <CartRow key={index} orderProduct = {data} />
             )
           })
         }
         <tr>
           <td>ລວມ</td>
           <td>ລາຄາລວມທັງໝົດ : </td>
           <td>ຈຳນວນລວມທັງໝົດ :</td>
         </tr>
       </tbody>
       <Container className="mt-4" style={{display:'flex',justifyContent:'flex-end', width:'360%'}}>
      <Button onClick={() => orderNow()} >ສັ່ງຊື້ດຽວນີ້</Button>
      </Container>
      </Table>   
    </Container>
  );
}
