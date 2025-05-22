import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { addTotalCartCount } from "../Features/UserSlice";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user.userData);
  const id = storeUser ? storeUser.userId : null;
  const [cartData, setCartData] = useState([]);
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/verizon/cart/${id}`
        );
        setCartData(response.data);
      } catch (err) {
        setCartError("Error fetching data");
      }
    };

    fetchData();
  }, []);
  const itemCount = cartData.length;

  dispatch(addTotalCartCount(itemCount));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link to={"/mobile/5"} style={{ textDecoration: "none" }}>
            <div
              className="card crd"
              style={{
                backgroundImage:
                  "url('https://ss7.vzw.com/is/image/VerizonWireless/iconic-hp-fast-follow-100724-left-iphoneproipad-bundle-d?fmt=webp&scl=1')",
                backgroundSize: "cover",
                height: "35rem",
              }}
            >
              <div className="card-body text-center text-white">
                <p className="card-text" style={{ fontSize: "40px" }}>
                  iphone 16 pro, ipad and <br /> 6 Months of Apple One <br />{" "}
                  all on us
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to={"/mobile/5"} style={{ textDecoration: "none" }}>
            <div
              className="card crd mb-4"
              style={{
                backgroundImage:
                  "url('https://ss7.vzw.com/is/image/VerizonWireless/iconic-hp-hero-bot-right-fast-follow-091924-d?fmt=webp-alpha&scl=1')",
                backgroundSize: "cover",
                height: "17rem",
              }}
            >
              <div className="card-body text-white">
                <p className="card-text" style={{ fontSize: "20px" }}>
                  Ends Soon
                </p>
                <p className="card-text" style={{ fontSize: "30px" }}>
                  Get iphone 15 <br /> Pro Max On Us <br />
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/mobile/6"} style={{ textDecoration: "none" }}>
            <div
              className="card crd"
              style={{
                backgroundImage:
                  "url('https://ss7.vzw.com/is/image/VerizonWireless/iconic-hp-hero-top-right-fast-follow-091924-d?fmt=webp-alpha&scl=1')",
                backgroundSize: "cover",
                height: "17rem",
              }}
            >
              <div className="card-body text-white">
                <p className="card-text" style={{ fontSize: "40px" }}>
                  Get the new <br /> iphone 16 On Us <br />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <hr />
        <p className="font-weight-bold display-4 ml-3" data-testid="T1001">
          Our Latest Offers For you
        </p>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card crd" style={{ height: "25rem" }}>
              <div className="card-body">
                <p className="card-text">
                  Get the new Samsung Galaxy S24 FE on us
                </p>
              </div>
              <a href="#">
                <img
                  src="../assets/Home_picture_8.png"
                  alt="offer_image"
                  className="img-fluid mx-auto d-block"
                  style={{ height: "250px", width: "200px" }}
                />
              </a>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ height: "25rem" }}>
              <div className="card-body">
                <p className="card-text">
                  iPhone 16 Pro, Hello Apple Intelligence
                </p>
              </div>
              <a href="#">
                <img
                  src="../assets/picture9.jpg"
                  alt="offer_image"
                  className="img-fluid mx-auto d-block"
                  style={{ height: "250px", width: "220px" }}
                />
              </a>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ height: "25rem" }}>
              <div className="card-body">
                <p className="card-text">Samsung Galaxy S24 Ultra</p>
              </div>
              <a href="#">
                <img
                  src="../assets/picture10.jpg"
                  alt="offer_image"
                  className="img-fluid mx-auto d-block"
                  style={{ height: "250px", width: "220px" }}
                />
              </a>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ height: "25rem" }}>
              <div className="card-body">
                <p className="card-text">Google Pixel</p>
              </div>
              <a href="#">
                <img
                  src="../assets/picture11.jpg"
                  alt="offer_image"
                  className="img-fluid mx-auto d-block"
                  style={{ height: "250px", width: "220px" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Home;
