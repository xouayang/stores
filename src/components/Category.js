import React, { useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
const Category = () => {
  const { brand } = useContext(LoginContext);
  return (
    <Container>
      {brand.length <= 0 && (
        <div className="spinner-border text-info" role="status"></div>
      )}
      <Row>
        <Col>
          {brand &&
            brand.map((data, index) => {
              return (
                <Link
                  key={index}
                  className="nav-link"
                  to={`/filter/${data?._id}`}
                  
                >
                  <h5 className="text-black" style={{ cursor: "pointer" }}>
                    {data.name}
                  </h5>
                </Link>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
