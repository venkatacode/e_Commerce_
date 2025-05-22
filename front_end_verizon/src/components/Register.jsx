import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    userName: "",
    userEmail: "",
    password: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNo: "",
  });

  const [formErrors, setFormErrors] = useState({
    userName: "",
    userEmail: "",
    password: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNo: "",
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
      case "fullName":
        const nameReg = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (value === "") {
          errors.fullName = "Field is required";
          isValid = false;
        } else if (value.length < 3) {
          errors.fullName = "Name should have a minimum of 3 characters";
          isValid = false;
        } else if (!nameReg.test(value)) {
          errors.fullName = "Please Enter First and Last name";
          isValid = false;
        } else {
          errors.fullName = "";
        }
        break;
      case "userName":
        const userNameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
        if (value === "") {
          errors.userName = "Field is required";
          isValid = false;
        } else if (!userNameRegex.test(value)) {
          errors.userName =
            "Username should be 3-15 characters long and can only contain letters, numbers, underscores, and hyphens";
          isValid = false;
        } else {
          errors.userName = "";
        }
        break;
      case "userEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") {
          errors.userEmail = "Field is required";
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errors.userEmail = "Invalid email address";
          isValid = false;
        } else {
          errors.userEmail = "";
        }
        break;
      case "password":
        if (value === "") {
          errors.password = "Field is required";
          isValid = false;
        } else if (value.length < 8 || value.length > 12) {
          errors.password =
            "The length of the password should be between 8 and 12 characters";
          isValid = false;
        } else {
          errors.password = "";
        }
        break;
      case "phoneNo":
        const phoneRegex = /^[0-9]{10}$/;
        if (value === "") {
          errors.phoneNo = "Field is required";
          isValid = false;
        } else if (!phoneRegex.test(value)) {
          errors.phoneNo = "Invalid phone number";
          isValid = false;
        } else {
          errors.phoneNo = "";
        }
        break;
      case "pincode":
        const pincodeRegex = /^[0-9]{6}$/;
        if (value === "") {
          errors.pincode = "Field is required";
          isValid = false;
        } else if (!pincodeRegex.test(value)) {
          errors.pincode = "Invalid pincode. It should be a 6-digit number";
          isValid = false;
        } else {
          errors.pincode = "";
        }
        break;
      default:
        if (value === "") {
          errors[name] = "Field is required";
          isValid = false;
        } else {
          errors[name] = "";
        }
        break;
    }

    setFormErrors(errors);
    setValid(Object.values(errors).every((error) => error === ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (valid) {
    try {
      const resp = await axios.post(
        "http://localhost:8080/verizon/register",
        state
      );
      console.log("Response data:", resp.data);

      if (resp.status === 201) {
        setError("");
        setMessage("Registration successful! Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      if (error.response) {
        console.log("Error response data:", error.response.data); // Log the error response data
        if (error.response.status === 409) {
          setError(error.response.data); // Display conflict error message
        } else {
          setError("An error occurred while registering. Please try again.");
        }
      } else {
        setError("Network error or server is down. Please try again later.");
      }
    }
    // } else {
    //   setMessage("");
    //   setError("Field is required");
    // }
  };

  return (
    <>
      <div className="containerr" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-14">
            <br />
            <div
              className="cards mx-auto mb-5"
              style={{
                width: "100%",
                marginLeft: "100px",
              }}
            >
              <div className="card-body">
                <div className="row p-3">
                  <div className="col-lg-5" style={{ marginLeft: "50px" }}>
                    <form
                      onSubmit={handleSubmit}
                      className="border p-3"
                      autoComplete="off"
                      data-testid="register-form"
                    >
                      <h1
                        className="text-"
                        style={{
                          fontSize: "40px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Register
                      </h1>
                      <h4 style={{ marginTop: "-10px", marginBottom: "30px" }}>
                        here!!
                      </h4>
                      <div className="mb-2 mt-2">
                        <label
                          className="form-label"
                          style={{ color: "black" }}
                          htmlFor="fullName"
                          id="fullName"
                        >
                          Full Name:
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-0"
                          aria-labelledby="fullName"
                          name="fullName"
                          value={state.fullName}
                          onChange={change}
                          style={{
                            color: "black",
                            borderBottom: "1px solid black",
                            padding: "5px",
                          }}
                          autoComplete="off"
                        />
                        {formErrors.fullName && (
                          <span
                            className="text-danger"
                            data-testid="valid-error"
                          >
                            {formErrors.fullName}
                          </span>
                        )}
                      </div>
                      <div className="mb-2 mt-2">
                        <label
                          className="form-label"
                          style={{ color: "black" }}
                          htmlFor="userName"
                          id="userName"
                        >
                          User Name:
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-0"
                          aria-labelledby="userName"
                          name="userName"
                          value={state.userName}
                          onChange={change}
                          style={{
                            color: "black",
                            borderBottom: "1px solid black",
                            padding: "5px",
                          }}
                        />
                        {formErrors.userName && (
                          <span
                            className="text-danger"
                            data-testid="valid-error"
                          >
                            {formErrors.userName}
                          </span>
                        )}
                      </div>
                      <div className="mb-2 mt-2">
                        <label
                          className="form-label"
                          style={{ color: "black" }}
                          htmlFor="userEmail"
                          id="userEmail"
                        >
                          User Email:
                        </label>
                        <input
                          type="email"
                          aria-labelledby="userEmail"
                          className="form-control rounded-0"
                          name="userEmail"
                          value={state.userEmail}
                          onChange={change}
                          style={{
                            color: "black",
                            borderBottom: "1px solid black",
                            padding: "5px",
                          }}
                        />
                        {formErrors.userEmail && (
                          <span
                            className="text-danger"
                            data-testid="valid-error"
                          >
                            {formErrors.userEmail}
                          </span>
                        )}
                      </div>
                      <div className="mb-2 mt-2">
                        <label
                          className="form-label"
                          style={{ color: "black" }}
                          htmlFor="password"
                          id="password"
                        >
                          Password:
                        </label>
                        <input
                          type="password"
                          aria-labelledby="password"
                          className="form-control rounded-0"
                          name="password"
                          value={state.password}
                          onChange={change}
                          style={{
                            color: "black",
                            borderBottom: "1px solid black",
                            padding: "5px",
                          }}
                        />
                        {formErrors.password && (
                          <span
                            className="text-danger"
                            data-testid="valid-error"
                          >
                            {formErrors.password}
                          </span>
                        )}
                      </div>
                      <div className="mb-2 mt-2">
                        <div className="row">
                          <div className="col-8">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="address"
                              id="address"
                            >
                              Address:
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-0"
                              aria-labelledby="address"
                              name="address"
                              value={state.address}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.address && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.address}
                              </span>
                            )}
                          </div>
                          <div className="col-4">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="city"
                              id="city"
                            >
                              City:
                            </label>
                            <input
                              aria-labelledby="city"
                              type="text"
                              className="form-control rounded-0"
                              name="city"
                              value={state.city}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.city && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.city}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 mt-2">
                        <div className="row">
                          <div className="col-6">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="state"
                              id="state"
                            >
                              State:
                            </label>
                            <input
                              type="text"
                              aria-labelledby="state"
                              className="form-control rounded-0"
                              name="state"
                              value={state.state}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.state && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.state}
                              </span>
                            )}
                          </div>
                          <div className="col-6">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="country"
                              id="country"
                            >
                              Country:
                            </label>
                            <input
                              type="text"
                              aria-labelledby="country"
                              className="form-control rounded-0"
                              name="country"
                              value={state.country}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.country && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.country}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 mt-2">
                        <div className="row">
                          <div className="col-6">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="pincode"
                              id="pincode"
                            >
                              Pincode:
                            </label>
                            <input
                              aria-labelledby="pincode"
                              type="text"
                              className="form-control rounded-0"
                              name="pincode"
                              value={state.pincode}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.pincode && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.pincode}
                              </span>
                            )}
                          </div>
                          <div className="col-6">
                            <label
                              className="form-label"
                              style={{ color: "black" }}
                              htmlFor="phoneNo"
                              id="phoneNo"
                            >
                              Phone No:
                            </label>
                            <input
                              type="text"
                              aria-labelledby="phoneNo"
                              className="form-control rounded-0"
                              name="phoneNo"
                              value={state.phoneNo}
                              onChange={change}
                              style={{
                                color: "black",
                                borderBottom: "1px solid black",
                                padding: "5px",
                              }}
                            />
                            {formErrors.phoneNo && (
                              <span
                                className="text-danger"
                                data-testid="valid-error"
                              >
                                {formErrors.phoneNo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-dark mb-3"
                        data-testid="Register-btncheck"
                        disabled={!valid}
                        style={{
                          marginTop: "40px",
                          borderRadius: "30px",
                          backgroundColor: "black",
                          color: "white",
                          width: "190px",
                          height: "35px",
                          marginLeft: "60px",
                        }}
                      >
                        Register
                      </button>

                      <br />
                      {Message && (
                        <div data-testid="Message" className="text-success">
                          {Message}
                        </div>
                      )}
                      {error && (
                        <div data-testid="Message" className="text-danger">
                          {error}
                        </div>
                      )}
                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Sign In
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 text-center">
                    <img
                      src="../assets/img.png"
                      alt="Apple16"
                      className="img-fluid mt-5"
                      style={{ maxWidth: "100%", height: "450px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default Register;
