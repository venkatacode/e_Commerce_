import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const storeUserId = useSelector((state) => state.user.userData?.userId);
  useEffect(() => {
    const fetch = async () => {
      debugger;
      try {
        const res = await axios.get(
          `http://localhost:8080/verizon/${storeUserId}`
        );
        setOrders(res.data);
      } catch {
        setErrorMessage("Error Fetching Data");
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className=" mt-3 mx-4 p-2">
        <h3 className="text-decoration-underline">Your Orders</h3>
      </div>
      <div className="container my-5">
        {orders.map((order) => {
          return (
            <div key={order.orderId} className="row mb-4">
              <div className="col-12 col-md-8 offset-md-2">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center rounded-4 border p-4 gap-5 shadow-sm">
                  {/* <div className="m-2" onClick={()=>navigate(`mobile/:${order.mobileDTO.mobileId}`)}> */}
                  <Link to={`/mobile/${order.mobileDTO.mobileId}`}>
                    <img
                      src={order.mobileDTO.imageUrl}
                      alt={order.mobileDTO.brand}
                      className="img-fluid rounded-4"
                      style={{ maxHeight: "250px", width: "auto" }}
                    />
                  </Link>
                  {/* </div> */}
                  <div className="d-flex flex-column align-items-center ms-md-4 mt-3 mt-md-0">
                    <p className="fs-3 fw-bold">{order.mobileDTO.brand}</p>
                    <p className="fs-6 fw-bold text-muted">
                      {order.mobileDTO.model}
                    </p>
                    <p>
                      <strong>Price:</strong> {order.mobileDTO.price}
                    </p>
                    <p>
                      <strong>Order Date:</strong> {order.orderDate}
                    </p>
                    <p>
                      <strong>Deliver Address:</strong> {order.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <div>
          <span className="text-danger">{errorMessage}</span>
        </div>
      )}
      <hr />
    </>
  );
};

export default OrderDetail;
