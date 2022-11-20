import React from "react";
import './App.css'
import Menubar from './components/Menubar'
import Content from "./components/Content";
//import Picture from "./image/logo1.PNG"
//import { Container, Nav, Navbar } from "react-bootstrap";
function App() {
  return (
    <div >
      <Menubar/>
      <Content/>
    </div>
  );
}


<Router>
<Menubar />
<Switch>
  <Route path="/cart">
    <Cart />
  </Route>
  <Route path="/statement">
    <Statement />
  </Route>
  <Route path="/products">
    <Products />
  </Route>
  <Route exact path="/">
   <Home/>
  </Route>
</Switch>
</Router>
export default App;
