import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem } from "../Features/UserSlice";
function MobileDetials() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user.userData);
  const id = storeUser ? storeUser.userId : null;
  // const isdfoSelected
  const { mobileId } = useParams();
  const [Message, setMessage] = useState("");
  const [cartData, setCartData] = useState([]);
  const [cartError, setCartError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [cartButton, setcartButton] = useState(false);
  const [Error, setError] = useState("");
  const [users, setUsers] = useState([
    {
      userId: id,
      userName: "",
      userEmail: "",
      password: "",
      fullName: "",
      address: "",
      city: "",
      state: "",
      countr: "",
      pincode: "",
      phoneNo: "",
      dfo: "",
    },
  ]);
  const [state, setState] = useState([
    {
      mobileId: mobileId,
      brand: "",
      model: "",
      price: "",
      displaySize: "",
      processor: "",
      ram: "",
      storage: "",
      camera: "",
      battery: "",
      imageUrl: "",
      color: "",
    },
  ]);

  const [cartDetails, setCartDetails] = useState({
    quantity: 1,
    userId: id,
    mobileId: mobileId,
  });
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/verizon/getuser/${id}`
        );
        // console.log("users data,",resp);
        // if(resp && resp.data){
        setUsers(resp.data[0]);
        console.log("resp data,", resp);
        console.log("usersdata", users);
        // }
        // else{
        setCartError("No data found in the response");
        // }
      } catch {
        setCartError("Error fetching data");
      }
    };
    fetchusers();
  }, [id]);
  // useEffect(() => {
  //   console.log("users updated:", users);
  // }, [users]);
  const isdfoholder = users.dfo?.toLowerCase() === "vcc";
  console.log("card", isdfoholder);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/verizon/mobile/${mobileId}`
        );
        setState(response.data);
      } catch (err) {
        navigate("/home");
      }
    };

    fetchData();
  }, [mobileId]);

  useEffect(() => {
    if (!id) {
      setCartError("User not logged in.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/verizon/cart/${id}`
        );
        // Check if response and response.data are valid before accessing
        if (response && response.data) {
          setCartData(response.data);
        } else {
          setCartError("No data found in the response");
        }
      } catch (err) {
        setCartError("Error fetching data");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (id === null) {
      setDisabled(true);
      return;
    }
    const isDisabled = cartData.some(
      (data) => data.mobileDTO.mobileId == mobileId
    );
    setDisabled(isDisabled);
  }, [cartData, mobileId, id]);

  const resetMsg = () => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
  };
  const handleSubmit = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/verizon/cart",
        cartDetails
      );
      dispatch(addCartItem());
      // setcartButton(true);
      setDisabled(true);
      setMessage("Item added to cart!");
      resetMsg();
    } catch (error) {
      setError("Something Went Wrong");
      setMessage("");
    }
  };

  const storage = state[0].storage;
  const getButtonStyle = (value) => {
    return {
      backgroundColor: "white",
      borderRadius: "5px",
      border: "1px solid",
      height: "35px",
      width: "75px",
      marginRight: "10px",
      position: "relative",
      ...(storage !== value && {
        backgroundImage:
          "linear-gradient(156deg, transparent 49%, black 49%, black 51%, transparent 51%)",
        backgroundSize: "100% 100%",
      }),
    };
  };
  const colour = state[0].color; // Example value, you can set this dynamically

  const getColorButtonStyle = (backgroundColor) => {
    const isDisabled = backgroundColor !== colour;
    return {
      backgroundColor,
      borderRadius: "20px",
      border: isDisabled ? "1px solid" : "3px solid grey",
      height: isDisabled ? "30px" : "40px",
      width: isDisabled ? "30px" : "40px",
      marginRight: "10px",
    };
  };

  const isDisabled = (backgroundColor) => backgroundColor !== colour;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            marginTop: "40px",
            marginLeft: "20px",
            marginBottom: "40px",
            fontSize: "45px",
            fontWeight: "bold",
          }}
        >
          {state.map((item) => item.brand)}&nbsp;
          {state.map((item) => item.model)}
          <br></br>
          <div style={{ fontSize: "23px", marginTop: "9px" }}>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-half" style={{ marginRight: "5px" }}></i>
            <text style={{ fontWeight: "lighter" }}> 2735 Reviews</text>
          </div>
        </h1>
        <h5 style={{ marginTop: "5px", marginRight: "20px" }}>
          <span>
            <i class="bi bi-chat-dots"></i>
            Chat
          </span>
        </h5>
      </div>
      <div
        className="container-fluid d-flex"
        style={{ gap: "10px", marginBottom: "80px", marginTop: "-70px" }}
      >
        {state.map((mob_Info) => (
          <div className="container rounded p-4 my-4">
            <div className="row align-items-start">
              <div className="col-md-4 text-center p-5 position">
                <img
                  src={mob_Info.imageUrl}
                  className="img-fluid "
                  alt={mob_Info.mobileId}
                  data-testid="mobile-data"
                  style={{
                    height: "300px",
                    Width: "320px",
                  }}
                />
              </div>
              <div className="col-md-8">
                {/* <h1><b>{mob_Info.model}</b></h1> */}
                <div className="row mt-4">
                  <div className="col-12">
                    {/* <div className="p-3 border bg-light">
                      <h3>
                        {mob_Info.brand}{" "}
                        <span
                          className="model-text"
                          style={{ fontSize: "1em", fontWeight: "normal" }}
                        >
                          ({mob_Info.model})
                        </span>
                      </h3>
                      <h2>
                        <b>₹{mob_Info.price}</b>{" "}
                      </h2>
                    </div> */}
                    <div className="p-3  bg-light mt-4">
                      <h5>
                        <b>Color: </b>
                        <text
                          style={{
                            color: "grey",
                            fontSize: "18px",
                            fontWeight: "normal",
                          }}
                        >
                          {mob_Info.color}
                        </text>
                      </h5>

                      <div style={{ marginTop: "10px" }}>
                        <button
                          style={getColorButtonStyle("Black")}
                          disabled={isDisabled("Black")}
                        ></button>
                        <button
                          style={getColorButtonStyle("Green")}
                          disabled={isDisabled("Green")}
                        ></button>
                        <button
                          style={getColorButtonStyle("Blue")}
                          disabled={isDisabled("Blue")}
                        ></button>

                        <button
                          style={getColorButtonStyle("Gold")}
                          disabled={isDisabled("Gold")}
                        ></button>
                      </div>
                    </div>
                    <hr />
                    <div className="p-3 bg-light mt-4">
                      <h5>
                        <b>Storage:</b>
                      </h5>
                      <div style={{ marginTop: "10px" }}>
                        <button style={getButtonStyle("128 GB")}>128 GB</button>
                        <button style={getButtonStyle("256 GB")}>256 GB</button>
                        <button style={getButtonStyle("512 GB")}>512 GB</button>
                      </div>
                    </div>

                    <hr />
                    <div className="p-3  bg-light mt-4">
                      <h5>
                        <b>Specification:</b>
                      </h5>

                      <div className="row">
                        <div className="col-md-6 col-12">
                          <ul className="list-unstyled p-2">
                            <li>
                              <b>Display Size: </b>

                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.displaySize}
                              </span>
                            </li>
                            <li>
                              <b>Processor: </b>

                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.processor}
                              </span>
                            </li>
                            <li>
                              <b>RAM: </b>

                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.ram}
                              </span>
                            </li>
                            <li>
                              <b>Storage: </b>

                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.storage}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6 col-12">
                          <ul className="list-unstyled p-2">
                            <li className="list-group-item">
                              <b>Camera: </b>
                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.camera}
                              </span>
                            </li>
                            <li className="list-group-item">
                              <b>Battery: </b>

                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.battery}
                              </span>
                            </li>
                            <li className="list-group-item">
                              <b>Color: </b>
                              <span style={{ color: "#8a7f80" }}>
                                {mob_Info.color}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {storeUser ? (
                      <>
                        <div className="p-3  bg-light mt-4">
                          <div className="d-flex justify-content-around mt-3">
                            <button className="btn btn-outline-secondary">
                              Add a new Line
                            </button>
                            <button className="btn btn-outline-secondary">
                              Upgrade a line
                            </button>
                          </div>
                        </div>

                        <hr></hr>
                      </>
                    ) : (
                      <>
                        <div className="p-3  bg-light mt-4">
                          <div className="d-flex justify-content-around mt-3">
                            {/* <button className="btn btn-outline-secondary">
                              Add a new Line
                            </button> */}
                            <input type="checkbox" />
                            Add a new Line
                            <button className="btn btn-outline-secondary">
                              Upgrade a line
                            </button>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="p-3  bg-light mt-4">
                          <h5>
                            <b>New or existing customer:</b>
                          </h5>
                          <p>Are you a new or existing customer?</p>
                          <div className="d-flex justify-content-around mt-3">
                            <Link
                              to="/register"
                              className="btn btn-outline-secondary"
                            >
                              New User
                            </Link>
                            <Link
                              to="/login"
                              className="btn btn-outline-secondary"
                            >
                              Existing Customer
                            </Link>
                          </div>
                        </div>
                        <hr></hr>
                      </>
                    )}

                    <div className="p-3  bg-light">
                      <h3>
                        <span
                          className="model-text"
                          style={{ fontSize: "1em", fontWeight: "normal" }}
                        >
                          Total device cost
                          <br />
                          <h2 style={{ marginBottom: "-8px" }}>
                            <b>₹{mob_Info.price}</b>{" "}
                          </h2>
                        </span>
                      </h3>
                      {users.dfo?.toLowerCase() === "vcc" ? (
                        <>
                          <label>
                            With,
                            <br />
                            <b>Verizon Visa Card</b>
                          </label>
                          <br />
                          <div>
                            {/* <h4>Savings on Bill</h4>  */}
                            <span style={{ color: "green", fontSize: "13px" }}>
                              after credit of ₹17.22/mo for 36 mos on your
                              Verizon mobile bill.
                            </span>
                          </div>
                          <br></br>
                          <span style={{ fontSize: "13px" }}>
                            Monthly payments shown are for customers who qualify
                            to pay ₹0 Down, ₹5.00/mo for 36 months after bill
                            credit, was ₹22.22/mo: 0% APR. Retail price:
                            ₹799.99.
                          </span>
                        </>
                      ) : (
                        <>
                          <label>
                            <p>
                              <Link to="/home">
                                <b>Apply Verizon Visa Card</b>
                              </Link>{" "}
                              to get 30% savings on Bill
                            </p>
                          </label>
                          <br></br>
                          <span style={{ fontSize: "13px" }}>
                            Verizon mobile bill ₹22.22/mo: 0% APR. Retail price:
                            ₹799.99. One-time activation fee of ₹35.
                          </span>
                          <br></br>
                          <span style={{ fontSize: "13px" }}>
                            Device unlocking policys
                          </span>
                          <br></br>
                          {/* <span style={{ fontSize: "17px" }}>
                            Or, choose a one-time payment of ₹799.99
                          </span> */}
                        </>
                      )}
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-around mt-2">
                      <button
                        className="btn  btn-lg"
                        style={{
                          border: "1px #FFC72C",

                          backgroundColor: "black",
                          borderRadius: "50px",
                          height: "43px",
                          width: "200px",
                          color: "white",
                        }}
                        data-testid="cart-btncheck"
                        onClick={handleSubmit}
                        disabled={disabled}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" /> Add
                        to Cart
                        {/* <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        {cartButton ? (
                          <Link
                            to={`/cart/${storeUser.userId}`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Go to Cart
                          </Link>
                        ) : (
                          "Add to Cart"
                        )} */}
                      </button>
                    </div>
                    <div className="mt-3">
                      {Message && (
                        <div className="alert alert-success" role="alert">
                          {Message}
                        </div>
                      )}
                      {Error && (
                        <div className="alert alert-danger" role="alert">
                          {Error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr></hr>
    </>
  );
}

export default MobileDetials;
