import React,{useState,useEffect} from "react";
import { Container, Col, Row, Carousel, Card , Button} from "react-bootstrap";
import laoCurrency from "@lailao10x/lao-currency";
import axios from "axios";
import swal from "sweetalert";
import {END_POINT} from '../constants/index'
export const Products = () => {
  const [product , setProduct] = useState([])
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


  // add to cart
  const addTocartProduct = (id) => {
    axios({method:"POST",url:`${END_POINT}/orders`,data: {product_id:id}, headers:{
      authorization: JSON.parse(localStorage.getItem("userToken"))
  }})
  .then((res) => {
      console.log(res.data)
       swalHandle()
  }).catch((error) => {
      console.log(error)
  })
  }

  const swalHandle = () => {
    swal({
        title:'ສຳເລັດ',
        text:'ສາມາດເບີ່ງລາຍລະອຽດໄດ້ທີ່ກະຕ່າ',
        icon:"success",
        buttons:"ອອກ"
    })
   }
const addTocart = (id) => {
   addTocartProduct(id)
}

  return (
    <Container>
      <Row>
        <Col md={12} className=" mt-5">
          <Row style={{marginLeft:'6rem'}} className="mb-1 mt-5">
            {product && product.map((data) => (
              <Card className="justify-content-center" key={data._id} style={{width:'16rem', marginLeft:'20px',marginBottom:'15px'}}>
               <Card.Img style={{cursor:'pointer', width:'130px', marginLeft:'3rem'}} src={`${END_POINT}/data/uploads/${data.image}`} alt="product_image" />
                 
               <Card.Body>
                 <Card.Title className="waring">ລາຄາ : {laoCurrency(data.price).format("LAK S")}</Card.Title>
                 <Card.Text>ເບຣນ: {data && data?.brand?.name}</Card.Text>
                 <Card.Text>ຈຳນວນ:{data.quantity}</Card.Text>
               </Card.Body>
               <Card.Footer>
                 <Button onClick={() => addTocart(data._id)}>ສັ່ງຊື້</Button>
               </Card.Footer>
              </Card>
            ))}                  
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
