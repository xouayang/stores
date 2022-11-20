import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Category from '../components/Category'
import laocurrency from '@lailao10x/lao-currency'
import axios from 'axios'
import {END_POINT} from '../constants/index'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { LoginContext } from '../contexts/LoginContext'
import swal from 'sweetalert'

const FilterProduct = () => {
  const {isLogin} = useContext(LoginContext)
    const {categoryId} = useParams();
    const [brand, setBrand] = useState([]);
    const [product, setProduct] = useState([]);
  // fetchBrand
  const fetchBrand = () => {
    axios
      .get(`${END_POINT}/brands`)
      .then((res) => {
        setBrand(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
// get product
  const getProduct = () => {
      axios.get(`${END_POINT}/products`)
      .then((res) => {
          let data = res.data.filter((data)=> data?.brand?._id == categoryId);
          setProduct(data)
      }).catch((error) => {
          console.log(error)
      })
  }
  useEffect(()=>{
      fetchBrand();
  }, [])

  useEffect(() => {
    getProduct();
  }, [categoryId]);


  const addProductToCart = (id) => {
     axios({
       method:'POST',
       url:`${END_POINT}/orders`,
       data:
          {product_id:id},
          headers:{
            authorization:JSON.parse(localStorage.getItem("userToken"))
          }
       
     }).then(() => {
         toast.success('success') 
     }).catch((error) => {
       console.log(error)
       toast.error('Not')
     })
  }
  const addTocart = (id) => {
    addProductToCart(id)
  } 

  const handleModal = () => {
    swal({
      title:'ທ່ານຄວນເຂົ້າສູ່ລະບົບກ່ອນ',
      text:'ຖ້າທ່ານຕ້ອງການໃຊ້ລະບົບນີ້ທ່ານຄວນເຂົ້າສູ່ລະບົບກ່ອນ',
      icon:'error',
      dangerMode:true,
      buttons:'ອອກ'
    })
  }
    return (
        <Container >
           <Row className="mt-4 mb-5">
               <Col md={3}>
                 <Category />
               </Col>
               <Col md={9}>
                 <Row md={4}>
                     {product && product.length>0 && product.map((data) => (
                         <Card key={data._id} style={{width:'18rem', marginLeft:'20px',marginBottom:'15px'}}>
                             <Card.Img style={{cursor:'pointer'}} src={`${END_POINT}/data/uploads/${data?.image}`} alt="product_image" />
                           <Card.Body>
                               <Card.Title>ລາຄາ:{ data?.price ? laocurrency(data?.price).format("LAK S"):""}</Card.Title>
                               <Card.Text>ເບຣນ: {data && data?.brand?.name}<br/>ລາຍລະອຽດ:{data.deatial}</Card.Text>
                           </Card.Body>
                           {isLogin ?
                           <Card.Footer>
                               <Button variant="primary"onClick = {() => addTocart(data._id)}>ສັ່ງຊື້</Button>
                           </Card.Footer>
                                :
                            <Card.Footer>
                               <Button variant="primary"onClick = {() => handleModal()}>ສັ່ງຊື້</Button>
                           </Card.Footer>
                                }
                         </Card>
                     ))}           
                 </Row>
               </Col>
              
           </Row>
        </Container>
    )
}

export default FilterProduct
