import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Cart } from "../pages/Cart";
import { Statement } from "../pages/Statement";
import { Products } from "../pages/Products";
import { Home } from "../pages/Home";
import FilterProduct from "../pages/FilterProduct";
import { LoginContext } from "../contexts/LoginContext";
//import Menubar from "../components/Menubar";
const MainRoute = () => {
  const { isLogin } = useContext(LoginContext);

  if (!isLogin) {
    return (
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/filter/:categoryId">
        <FilterProduct />
      </Route>
      <Route>
       <Redirect to ="/"/>
      </Route>
    </Switch>
    
    );
  }
  return (
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/carts">
        <Cart />
      </Route>
      <Route path="/statements">
        <Statement />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/filter/:categoryId">
        <FilterProduct />
      </Route>
      <Route>
        <Redirect to ="/"/>
      </Route>
    </Switch>
  );
};

export default MainRoute;
