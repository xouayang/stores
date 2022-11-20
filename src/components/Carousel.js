import React, { useContext } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import Picture2 from "../image/sneaker4.webp";
import ReactTypingEffect from "react-typing-effect";
import { LoginContext } from "../contexts/LoginContext";
export default function ControlledCarousel() {
  const {isLogin} = useContext(LoginContext)
  return (
    <div className="bg-success p-1 mt-2 mb-5">
      <Row className="justity-content-around">
        <Col md={6} className="">
          <Carousel variant="success">
            <Carousel.Item className="text-center">
              <img style={{ width: "300px" }} src={Picture2} alt="" />
              <Carousel.Caption>ເບຣນ : Nike</Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center">
              <img style={{ width: "300px" }} src={Picture2} alt="" />
              <Carousel.Caption>ເບຣນ : Adedas</Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center">
              <img
                style={{ width: "300px" }}
                className=" text-center"
                src={Picture2}
                alt=""
              />
              <Carousel.Caption>ເບຣນ : Wan </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      {isLogin ? 
       <Col md={6} className="text-center">
       <Container>
         <h4 style={{ marginTop: "5rem" }} className="text-white">
           <ReactTypingEffect
             text={"ເວັບໄຊຂາຍເກີບອອນລາຍ"}
             speed={100}
             eraseSpeed={50}
             typingDelay={100}
           />
         </h4>
         <h4 className="text-white mt-5">ຍີນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ</h4>
       </Container>
     </Col>
      :
      <Col md={6} className="text-center">
      <Container>
        <h4 style={{ marginTop: "5rem" }} className="text-white">
          <ReactTypingEffect
            text={"ເວັບໄຊຂາຍເກີບອອນລາຍ"}
            speed={100}
            eraseSpeed={50}
            typingDelay={100}
          />
        </h4>
        <h4 className="text-white mt-3">ເຂົ້າໃຊ້ລະບົບ</h4>
      </Container>
    </Col>
      }
      </Row>
    </div>
  );
}
