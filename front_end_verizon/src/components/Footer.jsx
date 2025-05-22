import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <h4 className="fw-bold border-bottom pb-2">Shop</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-3">
                <a href="/mobiles" className="text-decoration-none text-dark">
                  Devices
                </a>
              </li>
              <li className="mb-3">
                <a href="/home" className="text-decoration-none text-dark">
                  Accessories
                </a>
              </li>
              <li className="mb-3">
                <a href="/home" className="text-decoration-none text-dark">
                  Plans
                </a>
              </li>
              <li className="mb-3">
                <a href="/home" className="text-decoration-none text-dark">
                  Mobile+HomeDiscount
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <h4 className="fw-bold border-bottom pb-2">Top Device Brands</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Samsung
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Apple
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Google
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  OnePlus
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <h4 className="fw-bold border-bottom pb-2">Support</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Support Overview
                </a>
              </li>
              <li className="mb-3">
                <a href="/about" className="text-decoration-none text-dark">
                  Contact Us
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Community Forms
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Business Support
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <h4 className="fw-bold border-bottom pb-2" data-testid="F1001">
              About Verizon
            </h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-3">
                <a href="/about" className="text-decoration-none text-dark">
                  About Us
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Careers
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  News
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Articles
                </a>
              </li>
              <li className="mb-3">
                <a href="" className="text-decoration-none text-dark">
                  Responsibility
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <hr />
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          <div className="col-md-1 col-3">
            <img
              src="../assets/verizon_logo.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-9 d-flex justify-content-end">
            <a
              href=""
              className="text-decoration-none text-dark opacity-75 me-3"
            >
              Privacy
            </a>
            <a
              href=""
              className="text-decoration-none text-dark opacity-75 me-3"
            >
              Contact Us
            </a>
            <p className="text-dark opacity-75 me-3 mb-0">1-833-VERIZON</p>
            <a
              href="/terms"
              className="text-decoration-none text-dark opacity-75"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
