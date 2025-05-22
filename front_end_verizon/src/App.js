import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "bootstrap-icons/font/bootstrap-icons.css";
import Order from "./components/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Mobiles from "./components/Mobiles";
import Login from "./components/Login";
import Register from "./components/Register";
import MobileDetials from "./components/MobileDetails";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderDetail from "./components/OrderDetail";

function App() {
  const [fromCart, setFromCart] = useState(false);
  const storeUser = useSelector((state) => state.user.userData);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {storeUser ? (
            <Route
              path="/cart/:id"
              element={<Cart setFromCart={setFromCart} />}
            />
          ) : (
            ""
          )}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/mobile/:mobileId" element={<MobileDetials />}></Route>
          {storeUser && fromCart ? (
            <Route path="/order" element={<Order />}></Route>
          ) : (
            ""
          )}

          <Route path="/mobiles" element={<Mobiles />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/orders/:id" element={<OrderDetail/>}/>
          <Route path="*" element={<Home></Home>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
