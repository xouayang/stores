import React from "react";
import "../App.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Picture from "../image/sneaker2.jpg";
import Picture1 from "../image/sneaker1.jpg";
import Picture2 from "../image/sneaker4.webp";
const Content = () => {
  return (
    <div>
      <Container>
        <Row style={{ padding: 20 }}>
          
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img style={{ cursor: "pointer" }} src={Picture1} alt="" />
              <Card.Body>
                <Card.Title>Price: $129 </Card.Title>
                <Card.Text>Brand: Nike </Card.Text>
                <Button variant="primary">Shop now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img style={{ cursor: "pointer" }} src={Picture} alt="" />
              <Card.Body>
                <Card.Title>Price: $129 </Card.Title>
                <Card.Text>Brand: Adedas</Card.Text>
                <Button variant="primary">Shop now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img style={{ cursor: "pointer" }} src={Picture2} alt="" />
              <Card.Body>
                <Card.Title>Price: $129 </Card.Title>
                <Card.Text>Brand: Nike</Card.Text>
                <Button variant="primary">Shop now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img style={{ cursor: "pointer" }} src={Picture1} alt="" />
              <Card.Body>
                <Card.Title>Price: $129 </Card.Title>
                <Card.Text>Brand: Nike</Card.Text>
                <Button variant="primary">Shop now</Button>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
    </div>
  );
};

export default Content;
