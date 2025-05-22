import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../Features/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    userName: "",
    password: "",
  });
  const [valid, setValid] = useState(false);
  const [Message, setMessage] = useState("");
  const [error, setError] = useState("");

  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...state,
      [name]: value,
    });
    validation(name, value);
  };

  const validation = (name, value) => {
    let errors = { ...formErrors };
    let isValid = true;

    switch (name) {
      case "userName":
        if (value === "") {
          errors.userName = "This field is required";
        } else if (value.length < 3) {
          errors.userName = "Name should have minium 3 charater";
        } else {
          errors.userName = "";
        }
        break;
      case "password":
        if (value === "") {
          errors.password = "This field is required";
        } else if (value.length < 8 || value.length > 12) {
          errors.password =
            "The length of the password should be between 8 and 12 characters";
        } else {
          errors.password = "";
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setValid(errors.userName === "" && errors.password === "");
    //valid.isValid=valid.name && valid.email && valid.password && valid.cpass && valid.phone
    if (
      Object.values(errors).every((value) => value === "") &&
      Object.values(state).every((value) => value !== "")
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (valid) {
      try {
        const resp = await axios.post(
          "http://localhost:8080/verizon/getuser",
          state
        );

        // if (resp.status === 200) {
        setError("");
        dispatch(addUser(resp.data));
        setMessage("Login successful! Redirecting to home page...");
        navigate("/mobile");
        // }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.log("Error response data:", error.response.data);
          setError(error.response.data || "User Doesn't Exist");
        } else {
          setError("Network error or server is down. Please try again later.");
        }
      }
    } else {
      setMessage("");
      setError("Please fill in all fields correctly.");
    }
  };

  return (
    <>
      <br></br>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <form
                  onSubmit={handleSubmit}
                  className="p-3"
                  data-testid="login-form"
                >
                  <h1
                    className="text mb-4"
                    style={{
                      color: "black",
                      fontWeight: "bolder ",
                      fontSize: "55px",
                    }}
                  >
                    Log in
                  </h1>
                  <h4 style={{ marginTop: "-30px", marginBottom: "30px" }}>
                    to your verizon account
                  </h4>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ color: "black" }}
                      id="userName"
                    >
                      User Name:
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      name="userName"
                      aria-label="userName"
                      aria-labelledby="userName"
                      value={state.userName}
                      onChange={change}
                      style={{
                        color: "black",
                        borderBottom: "1px solid black",
                        // padding: "5px",
                      }}
                    />
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                      data-testid="errorTest"
                    >
                      {formErrors.userName && (
                        <span className="text-danger">
                          {formErrors.userName}*
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ color: "black" }}
                      id="password"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-0"
                      name="password"
                      aria-label="password"
                      aria-labelledby="password"
                      data-testid="test-password"
                      value={state.password}
                      onChange={change}
                      style={{
                        color: "black",
                        borderBottom: "1px solid black",
                        padding: "5px",
                      }}
                    />
                    <div style={{ marginTop: "10px" }} data-testid="errorTest">
                      {formErrors.password && (
                        <span className="text-danger">
                          {formErrors.password}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "50px" }}
                  >
                    <button
                      type="submit"
                      data-testid="logintest"
                      className="btn btn-dark w-50 mb-3"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "30px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                      disabled={!valid}
                    >
                      Login
                    </button>
                  </div>
                  {Message && (
                    <div
                      data-testid="Message"
                      className="text-success text-center"
                    >
                      {Message}
                    </div>
                  )}
                  {error && (
                    <div
                      data-testid="Message"
                      className="text-danger text-center"
                    >
                      {error}
                    </div>
                  )}
                  <div className="text-center mt-3">
                    Need Access?{" "}
                    <Link
                      to="/register"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Register for an account.
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "80px" }}></hr>
    </>
  );
};

export default Login;
