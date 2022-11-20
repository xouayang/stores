import React, { useState, useContext } from "react";
import { Container, Nav, Navbar, Modal, Button, Form, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { END_POINT } from "../constants/index";
import { LoginContext } from "../contexts/LoginContext";
const Menubar = () => {
  const { isLogin, setIsLogin, firstName, setFirstName } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleModal = () => setShow(!show);
  const handleRegister = () => setShowRegister(!showRegister);
  const [wrongAuth, setWrongAuth] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "customer",
  });
  const newData = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
    role: data.role,
  };

  // login state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const newInfo = {
    email: login.email,
    password: login.password,
  };
  // register user
  const registerUser = () => {
    setWrongEmail(false);
    axios
      .post(`${END_POINT}/users/signup`, newData)
      .then((user) => {
        if (user?.data?.message === "email exists") {
          setWrongEmail(true);
        } else {
          setShowRegister(false);
          localStorage.setItem("userToken", JSON.stringify(user.data.token));
          localStorage.setItem("name", user?.data?.firstname);
          setFirstName(localStorage.getItem("name"))
          setIsLogin(true);

          setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        setWrongEmail(true);
        console.log(error);
      });
  };
  const register = () => {
    registerUser();
  };

  // Login function
  const loginUser = () => {
    setWrongAuth(false);
    axios
      .post(`${END_POINT}/users/signin`, newInfo)
      .then((user) => {
        if (user?.data?.role === "customer") {
          setShow(false);
          localStorage.setItem("userToken", JSON.stringify(user.data.token));
          localStorage.setItem("name", user?.data?.firstname);
          setFirstName(localStorage.getItem('name'))
          setIsLogin(true);
        } else {
          setWrongAuth(true);
        }
        setLogin({
          email: "",
          password: "",
        })
      })
      .catch((error) => {
        setWrongAuth(true);
        console.log(error);
      });
  };
  const signin = () => {
    loginUser();
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand className="text-black">
          <h3 className="Shoes__Store">Shoes Store</h3>
        </Navbar.Brand>
        <Nav style={{ marginRight: 10 }}>
          {isLogin ? (
            <>
              <Nav.Link className="text-black ">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black"
                  to="/"
                >
                  ຫນ້າຫລັກ
                </Link>
              </Nav.Link>
              <Nav.Link className="text-black ">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black"
                  to="/carts"
                >
                  ກະຕ່າ
                </Link>
              </Nav.Link>
              <Nav.Link className="text-black ">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black"
                  to="/products"
                >
                  ສີນຄ້າ
                </Link>
              </Nav.Link>
              <Nav.Link className="text-black ">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black"
                  to="/statements"
                >
                  ປະຫວັດການສັ່ງຊີ້
                </Link>
              </Nav.Link>
              <NavDropdown style={{fontSize:'16px'}} title={firstName} id="basic-nav-dropdown">
                <NavDropdown.Item   className="text-center"   onClick={() => logout()}>ອອກຈາກລະບົບ</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link className="text-black ">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black"
                  to="/"
                >
                  ຫນ້າຫລັກ
                </Link>
              </Nav.Link>
              <Nav.Link className="text-black" onClick={handleModal}>
                ເຂົ້າສູ່ລະບົບ
              </Nav.Link>
              <Nav.Link className="text-black" onClick={handleRegister}>
                ລົງທະບຽນ
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>

      {/* Modal show Sign in  */}
      <Modal show={show} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>ເຂົ້າສູ່ລະບົບ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>ອີເມວ</Form.Label>
          <input
            className="form-control"
            type="email"
            placeholder="ອີເມວ"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <br />
          <Form.Label>ລະຫັດຜ່ານ</Form.Label>
          <input
            className="form-control"
            type="password"
            placeholder="ລະຫັດຜ່ານ"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          {wrongAuth && (
            <label style={{ fontSize: "18px" }} className="text-danger mt-4">
              ຊື່ຜູ້ໃຊ້ ຫລື ລະຫັດຜ່ານບໍ່ຖືກ
            </label>
          )}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleModal()}>
            ຍົກເລີກ
          </Button>
          <Button variant="primary" onClick={() => signin()}>
            ເຂົ້າສູ່ລະບົບ
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleRegister}>
        <Modal.Header>
          <Modal.Title> ລົງທະບຽນ </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>ຊື່</Form.Label>
            <Form.Control
              type="text"
              placeholder="ຊື່"
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>ນາມສະກຸນ</Form.Label>
            <Form.Control
              type="text"
              placeholder="ນາມສະກຸນ"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>ອີເມວ</Form.Label>
            <Form.Control
              type="email"
              placeholder="ອີເມວ"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>ລະຫັດຜ່ານ</Form.Label>
            <Form.Control
              type="password"
              placeholder="ລະຫັດຜ່ານ"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>
          <br />
          {wrongEmail && (
            <label
              style={{ fontSize: "18px" }}
              className="text-danger text-center"
            >
              ອີເມວມີໃນລະບົບເເລ້ວ
            </label>
          )}
          <br />
          <Modal.Footer>
            <Button variant="danger" onClick={handleRegister}>
              ຍົກເລີກ
            </Button>
            <Button variant="primary" onClick={() => register()}>
              ລົງທະບຽນ
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Menubar;
