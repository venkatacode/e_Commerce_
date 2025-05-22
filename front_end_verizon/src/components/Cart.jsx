import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem } from "../Features/UserSlice";

const Cart = ({ setFromCart }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cartData, setCartData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUserId = useSelector((state) => state.user.userData?.userId);

  // Get today's date
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 4);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedFutureDate = futureDate.toLocaleDateString(undefined, options);
  const navigate = useNavigate();
  useEffect(() => {
    if (id != storedUserId) {
      navigate("/home");
    }
  }, [id, storedUserId, navigate]);

  // Fetch the cart items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/verizon/cart/${id}`
        );
        if (response && response.data) {
          setCartData(response.data);
        } else {
          setError("No data found in the response");
        }

        const initialTotalQuantity = response.data.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const initialTotalPrice = response.data.reduce(
          (acc, item) => acc + item.mobileDTO.price * item.quantity,
          0
        );

        setTotalQuantity(initialTotalQuantity);
        setTotalPrice(initialTotalPrice);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Remove item from cart
  const removeItem = async (cartId) => {
    try {
      const itemToRemove = cartData.find((item) => item.cartId === cartId);
      await axios.delete(`http://localhost:8080/verizon/cart/${cartId}`);

      setCartData((prevData) =>
        prevData.filter((item) => item.cartId !== cartId)
      );
      setTotalQuantity((prev) => prev - itemToRemove.quantity);
      setTotalPrice(
        (prev) => prev - itemToRemove.mobileDTO.price * itemToRemove.quantity
      );
      dispatch(removeCartItem());
    } catch (err) {
      setError("Error removing item");
    }
  };

  // Increase quantity
  const increaseQuantity = async (mobileId, userId, cartId) => {
    try {
      await axios.patch(
        `http://localhost:8080/verizon/cartinc/${userId}/${mobileId}`
      );
      setCartData((prevData) => {
        const updatedData = prevData.map((item) => {
          if (item.cartId === cartId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        const newTotalQuantity = updatedData.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const newTotalPrice = updatedData.reduce(
          (acc, item) => acc + item.mobileDTO.price * item.quantity,
          0
        );

        setTotalQuantity(newTotalQuantity);
        setTotalPrice(newTotalPrice);
        return updatedData;
      });
    } catch (err) {
      setError("Error increasing quantity");
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (mobileId, userId, cartId) => {
    try {
      const itemToDecrease = cartData.find((item) => item.cartId === cartId);
      if (itemToDecrease.quantity > 1) {
        await axios.patch(
          `http://localhost:8080/verizon/cartdec/${userId}/${mobileId}`
        );
        setCartData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.cartId === cartId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

          const newTotalQuantity = updatedData.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          const newTotalPrice = updatedData.reduce(
            (acc, item) => acc + item.mobileDTO.price * item.quantity,
            0
          );

          setTotalQuantity(newTotalQuantity);
          setTotalPrice(newTotalPrice);
          return updatedData;
        });
      }
    } catch (err) {
      setError("Error decreasing quantity");
    }
  };

  const handleProcced = () => {
    setFromCart(true);
    navigate("/order", { state: cartData });
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalQuantity", totalQuantity);
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Error message */}
          <div className="col-12 mb-4">{error && <p>{error}</p>}</div>

          {/* Cart Information and Items */}
          <div className="col-lg-8 col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fs-3">Your cart.</h2>
              <a
                href="/mobiles"
                className="text-dark"
                data-testid="keep-shopping-link"
              >
                Keep Shopping
              </a>
            </div>
            <p className="fs-6 mb-4" data-testid="cart-info">
              Next up we'll get your contact info
            </p>

            {/* Display cart items */}
            {cartData.map((item) => (
              <div key={item.cartId} className="mb-4">
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-end">
                    <a
                      className="text-dark cursor-pointer"
                      onClick={() => removeItem(item.cartId)}
                      data-testid={`remove-item-${item.cartId}`}
                    >
                      Remove
                    </a>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between align-items-start">
                    {/* Item Image */}
                    <div className="col-12 col-md-4 mb-3">
                      <img
                        src={item.mobileDTO.imageUrl}
                        alt="img"
                        className="img-fluid rounded"
                        style={{ maxHeight: "150px", width: "auto" }}
                        data-testid={`item-image-${item.cartId}`}
                      />
                    </div>

                    {/* Item Info */}
                    <div className="col-12 col-md-7">
                      <div className="d-flex flex-column">
                        <p
                          className="fs-6 mb-2"
                          data-testid={`item-shipment-${item.cartId}`}
                        >
                          Shipment by, {formattedFutureDate}
                        </p>
                        <div className="d-flex justify-content-between">
                          <h4 data-testid={`item-brand-${item.cartId}`}>
                            {item.mobileDTO.brand}
                          </h4>
                          <h4 data-testid={`item-price-${item.cartId}`}>
                            ₹{item.mobileDTO.price}
                          </h4>
                        </div>
                        <h5
                          data-testid={`item-model-${item.cartId}`}
                          className="mb-2"
                        >
                          {item.mobileDTO.model}
                        </h5>
                        <p
                          data-testid={`item-storage-color-${item.cartId}`}
                          className="fs-6"
                        >
                          {item.mobileDTO.storage} {item.mobileDTO.color}
                        </p>

                        {/* Quantity Control */}
                        <div className="d-flex align-items-center mt-3">
                          <span className="me-2">Quantity:</span>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              decreaseQuantity(
                                item.mobileDTO.mobileId,
                                item.userDTO ? item.userDTO.userId : null,
                                item.cartId
                              )
                            }
                            data-testid={`decrease-quantity-${item.cartId}`}
                          >
                            <i className="bi bi-dash-circle"></i>
                          </button>
                          <span
                            className="mx-3"
                            data-testid={`item-quantity-${item.cartId}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              increaseQuantity(
                                item.mobileDTO.mobileId,
                                item.userDTO ? item.userDTO.userId : null,
                                item.cartId
                              )
                            }
                            data-testid={`increase-quantity-${item.cartId}`}
                          >
                            <i className="bi bi-plus-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <p
                    className="fs-6"
                    data-testid={`item-auto-pay-info-${item.cartId}`}
                  >
                    Set up AutoPay and Paper-free billing in the My Verixon App
                    once you have completed your purchase to save Rs500 each
                    month.ⓘ
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4 col-12">
            <h3 className="mb-4">Cart Summary</h3>
            <div className="bg-light p-3 rounded">
              {cartData.map((item) => (
                <React.Fragment key={item.cartId}>
                  <div className="d-flex justify-content-between">
                    <p>
                      Item: {item.mobileDTO.brand} {item.mobileDTO.model}
                    </p>
                    <p className="text-end">₹{item.mobileDTO.price}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Quantity</span>
                    <span>x{item.quantity}</span>
                  </div>
                  <hr />
                </React.Fragment>
              ))}

              {/* Total Quantity & Price */}
              <div className="d-flex justify-content-between mt-3">
                <h6>Total Quantity</h6>
                <span data-testid="total-quantity">{totalQuantity}</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h4>Total Price</h4>
                <span data-testid="total-price">₹{totalPrice.toFixed(2)}</span>
              </div>

              {/* Tax Information */}
              <div className="mt-2">
                <p className="fs-6 text-muted">Incl taxes and fees*</p>
              </div>

              {/* Proceed Button */}
              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-dark w-100"
                  style={{
                    borderRadius: "20px",
                    height: "40px",
                    maxWidth: "150px",
                  }}
                  disabled={cartData.length === 0}
                  data-testid="proceed-button"
                  onClick={() => handleProcced()}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Cart;
