import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Order = () => {
  const storeUser = useSelector((state) => state.user.userData);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState({});
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalP, setTotalP] = useState("");
  const [tDate, settDate] = useState("");
  const [mobileId, setMobileId] = useState([]);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const localtotalQuantity = localStorage.getItem("totalQuantity");
    if (localtotalQuantity) {
      setTotalQuantity(localtotalQuantity);
    }
    const localPrice = localStorage.getItem("totalPrice");
    if (localPrice) {
      setTotalP(localPrice);
    }
    const todayDate = getTodayDate();
    settDate(todayDate);
  }, []);

  const emptyCart = async (itemid) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/verizon/cart/${itemid}`
      );
    } catch (error) {
      console.error("Error deleting cart data:", error);
    }
  };

  const postRequest = async (combinedObject, itemid) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/verizon/addorder`,
        combinedObject
      );
      setSuccessMessage("Order has been placed successfully!");
      setTotalQuantity("0");
      setTotalP("0");
      localStorage.setItem("totalPrice", "0");
      localStorage.setItem("totalQuantity", "0");
      setDisabled(true);
      emptyCart(itemid);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const updateData = async (item) => {
    const itemid = item.cartId;
    const combinedObject = {
      mobileDTO: item.mobileDTO,
      userDTO: storeUser,
      totalPrice: item.mobileDTO.price * item.quantity,
      address: address,
      city: city,
      state: state,
      country: country,
      pincode: Number(pincode),
      orderDate: tDate,
    };

    postRequest(combinedObject, itemid);
  };

  const handleOrder = () => {
    const newErrors = {};
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!pincode) newErrors.pincode = "Pincode is required.";
    else if (!/^\d+$/.test(pincode))
      newErrors.pincode = "Only digits are required in Pincode.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Proceed with order submission logic

      location.state?.map((item) => {
        updateData(item);
        // console.log("item in order: ", item);
      });
      // Reset fields if needed
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setPincode("");
      setErrors({});
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));

    // Special validation for pincode to check for digits
    if (field === "pincode") {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Only digits are required in Pincode.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, pincode: undefined }));
      }
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-around">
          <div className="col-md-8">
            <div className="border p-3 mb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-1-square me-2"></i>
                <span className="fs-4 me-auto">
                  Login <i className="bi bi-check-lg"></i>
                </span>
                <p className="ms-3">{storeUser?.fullName}</p>
              </div>
            </div>
            <div className="border rounded p-3">
              <div className="bg-light p-2 mb-3">
                <i className="bi bi-2-square me-2"></i>
                <span className="fs-5">Delivery Address</span>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Address:
                    <input
                      type="text"
                      value={address}
                      onChange={handleInputChange(setAddress, "address")}
                      className="form-control"
                    />
                    {errors.address && (
                      <span className="text-danger">{errors.address}</span>
                    )}
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    City:
                    <input
                      type="text"
                      value={city}
                      onChange={handleInputChange(setCity, "city")}
                      className="form-control"
                    />
                    {errors.city && (
                      <span className="text-danger">{errors.city}</span>
                    )}
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    State:
                    <input
                      type="text"
                      value={state}
                      onChange={handleInputChange(setState, "state")}
                      className="form-control"
                    />
                    {errors.state && (
                      <span className="text-danger">{errors.state}</span>
                    )}
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Country:
                    <input
                      type="text"
                      value={country}
                      onChange={handleInputChange(setCountry, "country")}
                      className="form-control"
                    />
                    {errors.country && (
                      <span className="text-danger">{errors.country}</span>
                    )}
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Pincode:
                    <input
                      type="text"
                      value={pincode}
                      onChange={handleInputChange(setPincode, "pincode")}
                      className="form-control"
                    />
                    {errors.pincode && (
                      <span className="text-danger">{errors.pincode}</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Order Summary</h3>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <span data-testid="price-test">Total Price</span>
                <span>₹{totalP}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span data-testid="quantity-test">Quantity</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h4>Total Amount</h4>
                <span>₹{totalP}</span>
              </div>
              <span className="text-muted">Incl taxes and fees.</span>
            </div>
            <div className="mt-4 d-flex justify-content-center ">
              <button
                onClick={() => handleOrder()}
                className="btn btn-dark w-50 mb-3"
                disabled={disabled}
                style={{ borderRadius: "25px" }}
              >
                Order
              </button>
            </div>
            {successMessage && (
              <div className="text-success fw-bold mt-3">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Order;
