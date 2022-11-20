import React,{useState, useEffect, useContext} from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Category from '../components/Category'
import ControlledCarousel from '../components/Carousel'
import laocurrency from '@lailao10x/lao-currency'
import axios from 'axios'
import swal from 'sweetalert'
import {toast} from 'react-toastify'
import {END_POINT} from '../constants/index'
import { LoginContext } from '../contexts/LoginContext'
export const Home = () => {
const {isLogin} = useContext(LoginContext)
const [product, setProduct] = useState([])
// get product
const getProduct = () => {
      axios.get(`${END_POINT}/products`)
      .then((res) => {
          setProduct(res.data)
      }).catch((error) => {
          console.log(error)
      })
  }
   useEffect(() => {
       getProduct()
   },[])


   // add product to cart
    const addProductToCart = (id) => {
        axios({method:"POST",url:`${END_POINT}/orders`,data: {product_id:id}, headers:{
            authorization: JSON.parse(localStorage.getItem("userToken"))
        }})
        .then((res) => {
            console.log(res.data)
            swalHandle()
        }).catch((error) => {
            toast.error('Not Success ')
            console.log(error)
        })
    }
    
    const addToCart = (id) => {
        addProductToCart(id)
    }

    const swalHandle = () => {
     swal({
         title:'ສັ່ງຊື້ສຳເລັດ',
         text:'ສາມາດເບີ່ງລາຍລະອຽດໄດ້ທີ່ກະຕ່າ',
         icon:"success",
         buttons:"ອອກ"
     })
    }
    const handleSwal = () => {
        swal({
            title:'ທ່ານຄວນເຂົ້າສູ່ລະບົບກ່ອນ',
            text: "ຖ້າທ່ານຕ້ອງການໃຊ້ລະບົບນີ້ທ່ານຄວນເຂົ້າສູ່ລະບົບກ່ອນ",
            icon: "error",
            dangerMode:true ,
            buttons:'ອອກ'
        })
    }
    return (
        <div>
        <Container >
        <ControlledCarousel />
           <Row className="mt-4 mb-5">
               <Col md={3}>
                 <Category />
               </Col>
               <Col md={9}>
                 <Row md={4}>
                     {product && product.map((data) => (
                         <Card key={data._id} style={{width:'18rem', marginLeft:'20px',marginBottom:'15px'}}>
                             <Card.Img style={{cursor:'pointer'}} src={`${END_POINT}/data/uploads/${data.image}`} alt="product_image" />
                           <Card.Body>
                               <Card.Title>ລາຄາ:{laocurrency(data.price).format("LAK S")}</Card.Title>
                               <Card.Text>ເບຣນ: {data && data?.brand?.name}<br/>ລາຍລະອຽດ:{data.deatial}</Card.Text>
                           </Card.Body>
                           {isLogin ? 
                           <Card.Footer>
                               <Button variant="primary" onClick={() => addToCart(data._id)}>ສັ່ງຊື້</Button>
                           </Card.Footer>
                           :<Card.Footer>
                               <Button variant = "primary" onClick ={() => handleSwal()}>ສັ່ງຊື້</Button>
                           </Card.Footer>
                                }
                         </Card>
                     ))}           
                 </Row>
               </Col>
              
           </Row>
        </Container>
        </div>
    )
}
