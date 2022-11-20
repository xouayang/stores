import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menubar from "./components/Menubar";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";
import axios from "axios";
import { END_POINT } from "./constants";
import MainRoute from "./routes/MainRoute";

export default function App() {
  const [brand, setBrand] = useState([]);
  const [isLogin, setIsLogin] = useState(false)
  const [firstName, setFirstName] = useState(null)
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
  const checkLocalLogin = () => {
    let userToken = localStorage.getItem('userToken');
    if(userToken === null) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }
  useEffect(() => {
    checkLocalLogin();
    setFirstName(localStorage.getItem('name'))
    fetchBrand();
  }, []);
  return (
    <LoginContext.Provider value={{
      brand, isLogin, setIsLogin, firstName, setFirstName
    }}>
      <Router>
        <ToastContainer/>
        <Menubar/>
        <MainRoute/>
      </Router>
     </LoginContext.Provider>
  );
}
