import React, { useContext, useEffect, useState } from "react";
import laoCurrency from "@lailao10x/lao-currency";
import { END_POINT } from "../constants/index";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
const CartRow = ({ orderProduct }) => {
  const [quantity, setQuantity] = useState(
    orderProduct?.orderDetail[0].quantity
  );
  const [price, setPrice] = useState(
    orderProduct?.orderDetail[0]?.product?.price
  );
  const [priceSecond, setPriceSecond] = useState(price)
  //  console.log(setPrice)
  const updateQuantity = (id, quantity) => {
    let qty = parseInt(quantity) + 1;
    setQuantity(quantity + 1);
    axios({
      method: "PUT",
      url: `${END_POINT}/orderDetails/${id}`,
      data: { quantity: qty },
    })
      .then(() => {
        console.log("Updated Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPriceSecond(quantity * price);
  }, [quantity]);

  const deleteQuantity = (id) => {
    axios
      .delete(`${END_POINT}/orderDetails/${id}`)
      .then(() => {
        console.log("Successed to Deleted");
      })
      .catch((error) => {
        console.log(error)
      })
  };  
  // useEffect(() => {
  //   let price  = 0;
  //   for(let i = 0 ; i<priceSecond.length; i++){
  //      price = price + priceSecond[i]
  //   }
  //   setSumTotal(price)
  // },[])
  return (
    <>
      <tr>
        <td>
          <img
            className="mt-3"
            style={{ width: "80px" }}
            src={`${END_POINT}/data/uploads/${orderProduct?.orderDetail[0]?.product?.image}`}
            alt="order"
          />
        </td>
        <td>
          <p>ຊື່ : {orderProduct?.orderDetail[0]?.product?.name}</p>
          <p> ລາຄາ : {laoCurrency(price).format("LAK S")}</p>
           <p> ລາຄາລວມ: {laoCurrency(priceSecond).format("LAK S")}</p>
  
        </td>
        <td>
          <Row>
            <Col md={6} className="mt-5">
              <p> ຈຳນວນ: {quantity}</p>
            </Col>
            <Col md={6}>
              <Button
                variant="primary"
                onClick={() =>
                  updateQuantity(orderProduct?.orderDetail[0]?._id, quantity)
                }
              >
                ເພີ່ມ
              </Button>
              <br />
              <br />
              <Button
                variant="danger"
                style={{ width: "51px" }}
                onClick={() => deleteQuantity(orderProduct._id)}
              >
                ລົບ
              </Button>
            </Col>
          </Row>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
