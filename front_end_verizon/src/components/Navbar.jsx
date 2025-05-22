import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Features/UserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const storeUser = useSelector((state) => state.user.userData);
  const storeCartItems = useSelector((state) => state.user.cartCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <div className="bg-white border-bottom">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=shopping_cart"
      />

      <div className="d-flex border-bottom">
        <Link
          to=""
          className="text-decoration-none text-black-50"
          style={{ fontFamily: "fantasy", marginLeft: "20px", color: "red" }}
        >
          Personal
        </Link>
        |
        <Link to="" className="text-decoration-none text-black-50">
          Business
        </Link>
        <div className="ms-auto">
          <Link to="" className="text-decoration-none text-black-50">
            1-833-VERIZON
          </Link>
          | |
          <Link to="" className="text-decoration-none text-black-50">
            Support
          </Link>
          |
          <Link to="" className="text-decoration-none text-black-50">
            Contact us
          </Link>
          |
          <Link to="" className="text-decoration-none text-black-50">
            Stores
          </Link>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src="../assets/verizontext.png"
              alt="Bootstrap"
              width="150"
              height="62"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title text-danger fw-bold"
                id="offcanvasNavbarLabel"
              >
                VERIZON
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mt-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="/mobiles">
                    Mobiles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="#">
                    Home Internet
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="#">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="#">
                    Deals
                  </Link>
                </li>
              </ul>
              <form className="d-flex mt-3 mt-2" role="search">
                <input
                  className="form-control me-2 rounded-pill"
                  type="search"
                  placeholder="Search Verizon"
                  aria-label="Search"
                />
              </form>
              {storeUser && (
                <div
                  onClick={() => {
                    navigate(`/cart/${storeUser.userId}`);
                  }}
                  aria-label="carttest"
                  data-testid="carttest"
                  className="text-black fw-bold mt-2 me-2 cursor-pointer"
                >
                  <i className="bi bi-cart3 fs-4 position-relative">
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger fs-6">
                      {storeCartItems}
                    </span>
                  </i>
                </div>
              )}
              <ul className="navbar-nav mt-2  ">
                {storeUser ? (
                  <li className="nav-item dropdown fw-bold">
                    <Link
                      className="nav-link dropdown-toggle text-black"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {storeUser.userName}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to="#">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item"  to={`/orders/${storeUser.userId}`}>
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/home"
                          onClick={handleLogout}
                        >
                          LogOut
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fw-bold"
                      to="/login"
                      data-testid="signup-test"
                    >
                      SignIn
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
