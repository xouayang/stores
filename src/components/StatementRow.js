import React from 'react'
import {Row, Col} from 'react-bootstrap'
import laoCurrency from "@lailao10x/lao-currency";
import laotime from "@lailao10x/laotime";
import { END_POINT } from '../constants';
const StatementRow = ({orderProduct}) => {
    return (
         <Row className="shadow p-2 mb-5">
            <Col md={6}>
            <p className="text-black">ສັ່ງຊື້ໂດຍ : {orderProduct?.customer?.firstname} </p>
            <p>ຊື່ສີນຄ້າ :  {orderProduct?.orderDetail[0]?.product?.name}</p>
            <p>ຈຳນວນ : {orderProduct?.orderDetail[0]?.quantity}</p>
            <p className="text-black">
            ລາຄາລວມ  : {laoCurrency(orderProduct?.orderDetail[0]?.product?.price).format("S LAK")}  
            </p>

            </Col>
            <Col md={6} className="text-center">
            <p className="text-black">ສະຖານະ : {orderProduct?.status} </p> 
              <p>ສັ່ງຊື້ວັນທີ່  : {laotime(orderProduct?.orderDetail?.createdAt,"D,M,Y H:MN:S")} </p>
              <p>ຮູບພາບ</p>
              <img className="text-center" style={{width:'100px', height:'100px'}}  src={`${END_POINT}/data/uploads/${orderProduct?.orderDetail[0]?.product?.image}`} alt="#"/>
            </Col>
         </Row>
    )
}

export default StatementRow
