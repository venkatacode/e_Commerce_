import React, { act, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [color, setColor] = useState([]); // Array to hold selected colors
  const [storage, setStorage] = useState([]); // Array to hold selected storage options
  const [brand, setBrand] = useState([]); // Array to hold selected brands
  const [camera, setCamera] = useState([]); // Array to hold selected camera options
  const [filteredMobiles, setFilteredMobiles] = useState([]); // State to hold filtered mobiles
  const [showLowestPrices, setShowLowestPrices] = useState(false);
  const [isBrandSelected, setIsBrandSelected] = useState(false);
  const [check, setCheck] = useState(false);
  const getFilteredMobiles = () => {
    // If no filters are selected, return all mobiles
    // let filtered = mobiles;
    // if (brand.length === 0 && !showLowestPrices) {
    //   return mobiles; // Show all mobiles if no filters
    // }
    if (
      color.length === 0 &&
      storage.length === 0 &&
      brand.length === 0 &&
      camera.length === 0 &&
      !showLowestPrices
    ) {
      return mobiles; // Show all mobiles
    }

    return mobiles.filter((mobile) => {
      const colorCondition = color.length === 0 || color.includes(mobile.color);
      const storageCondition =
        storage.length === 0 || storage.includes(mobile.storage);
      const brandCondition = brand.length === 0 || brand.includes(mobile.brand);
      const cameraCondition =
        camera.length === 0 || camera.includes(mobile.camera);
      // Apply price filter if the switch is toggled
      const priceCondition = !showLowestPrices || mobile.price < 70000; // Adjust price threshold as needed
      return (
        colorCondition &&
        storageCondition &&
        brandCondition &&
        cameraCondition &&
        priceCondition
      );
    });
  };

  const filterByApple = () => {
    toggleBrand("Apple");
  };

  const filterBySamsung = () => {
    // filterByBrand("Samsung"); // Directly filter by Samsung
    toggleBrand("Samsung");
  };
  const filterByOneplus = () => {
    // filterByBrand("OnePlus"); // Directly filter by Apple
    toggleBrand("OnePlus");
  };

  const filterByGooglePixel = () => {
    // filterByBrand("Google"); // Directly filter by Samsung
    toggleBrand("Google");
  };

  const clearFilters = (selectedBrand) => {
    // Remove the selected brand from the brand array
    toggleBrand(selectedBrand);
    setFilteredMobiles(selectedBrand);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8080/verizon/mobiles");

        setMobiles(res.data);
        setFilteredMobiles(res.data); // Set filteredMobiles to all fetched mobiles
      } catch {
        setErrorMessage("NETWORK_ERROR");
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const results = getFilteredMobiles();
    setFilteredMobiles(results);
  }, [showLowestPrices]);

  // Check if any checkbox is checked
  const isAnyCheckboxChecked =
    color.length > 0 ||
    storage.length > 0 ||
    brand.length > 0 ||
    camera.length > 0;

  const toggleColor = (selectedColor) => {
    setColor((prevColor) => {
      const newColor = prevColor.includes(selectedColor)
        ? prevColor.filter((c) => c !== selectedColor)
        : [...prevColor, selectedColor];

      // Filter the mobiles immediately after updating the color options
      const results = mobiles.filter((mobile) => {
        const brandCondition =
          brand.length === 0 || brand.includes(mobile.brand);
        const cameraCondition =
          camera.length === 0 || camera.includes(mobile.camera);
        const storageCondition =
          storage.length === 0 || storage.includes(mobile.storage);
        const colorCondition =
          newColor.length === 0 || newColor.includes(mobile.color);
        const priceCondition = !showLowestPrices || mobile.price < 70000;

        return (
          brandCondition &&
          cameraCondition &&
          storageCondition &&
          colorCondition &&
          priceCondition
        );
      });

      setFilteredMobiles(results); // Update filtered mobiles
      return newColor; // Update the color state
    });
  };

  const toggleStorage = (selectedStorage) => {
    setStorage((prevStorage) => {
      const newStorage = prevStorage.includes(selectedStorage)
        ? prevStorage.filter((s) => s !== selectedStorage)
        : [...prevStorage, selectedStorage];

      // Filter the mobiles immediately after updating the storage options
      const results = mobiles.filter((mobile) => {
        const brandCondition =
          brand.length === 0 || brand.includes(mobile.brand);
        const cameraCondition =
          camera.length === 0 || camera.includes(mobile.camera);
        const storageCondition =
          newStorage.length === 0 || newStorage.includes(mobile.storage);
        const priceCondition = !showLowestPrices || mobile.price < 70000;

        return (
          brandCondition &&
          cameraCondition &&
          storageCondition &&
          priceCondition
        );
      });

      setFilteredMobiles(results); // Update filtered mobiles
      return newStorage; // Update the storage state
    });
  };

  const toggleBrand = (selectedBrand) => {
    setBrand((prevBrand) => {
      const newBrand = prevBrand.includes(selectedBrand)
        ? prevBrand.filter((b) => b !== selectedBrand) // Remove the brand if already selected
        : [...prevBrand, selectedBrand]; // Add the brand if not selected

      // Filter the mobiles based on the updated brand list
      const results = mobiles.filter((mobile) => {
        const brandCondition =
          newBrand.length === 0 || newBrand.includes(mobile.brand);
        const priceCondition = !showLowestPrices || mobile.price < 70000;

        return brandCondition && priceCondition;
      });
      setCheck(!check);
      setFilteredMobiles(results); // Update filtered mobiles

      return newBrand; // Update the brand state
    });
  };
  const toggleCamera = (selectedCamera) => {
    setCamera((prevCamera) => {
      const newCamera = prevCamera.includes(selectedCamera)
        ? prevCamera.filter((c) => c !== selectedCamera)
        : [...prevCamera, selectedCamera];

      // Filter the mobiles immediately after updating the camera options
      const results = mobiles.filter((mobile) => {
        const brandCondition =
          brand.length === 0 || brand.includes(mobile.brand);
        const cameraCondition =
          newCamera.length === 0 || newCamera.includes(mobile.camera);
        const priceCondition = !showLowestPrices || mobile.price < 70000; // Adjust price threshold as needed

        return brandCondition && cameraCondition && priceCondition;
      });

      setFilteredMobiles(results); // Update filtered mobiles
      return newCamera; // Update the camera state
    });
  };

  const toggleShowLowestPrices = () => {
    setShowLowestPrices((prev) => !prev); // Toggle the price filter

    // filteredMobiles.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Adjust price threshold as needed
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex flex-column flex-md-row bg-light">
        <div className="w-100 w-md-25 mt-5 text-center">
          {/* PriceFilter */}
          <div className="mb-5 ms-3 fs-5">
            <div className="form-check form-switch p-0">
              <div className="d-inline-flex flex-row-reverse gap-1">
                <input
                  className="form-check-input ms-0"
                  data-testid="lowestPrice-test"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={showLowestPrices}
                  onChange={toggleShowLowestPrices}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Lowest Prices
                </label>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="accordion mb-5" id="accordionExample">
            <div className="accordion-item bg-light">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{
                    fontSize: "25px",
                    fontFamily: "sans-serif",
                    color: "#4d4c4c",
                  }}
                >
                  Brand
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  <ul className="list-group list-group-flush fs-6">
                    <li className="list-group-item ">
                      <input
                        type="checkbox"
                        checked={brand.includes("Apple")}
                        onChange={() => toggleBrand("Apple")}
                        data-testid="brand-checkbox1"
                        className="me-2"
                      />
                      Apple
                    </li>
                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        checked={brand.includes("Samsung")}
                        onChange={() => toggleBrand("Samsung")}
                        data-testid="brand-checkbox2"
                        className="me-2"
                      />
                      Samsung
                    </li>
                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        checked={brand.includes("OnePlus")}
                        onChange={() => toggleBrand("OnePlus")}
                        data-testid="brand-checkbox3"
                        className="me-2"
                      />
                      OnePlus
                    </li>
                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        checked={brand.includes("Google")}
                        onChange={() => toggleBrand("Google")}
                        data-testid="brand-checkbox4"
                        className="me-2"
                      />
                      Google
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-light">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{
                    fontSize: "25px",
                    fontFamily: "sans-serif",
                    color: "#4d4c4c",
                  }}
                >
                  Camera
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  <ul className="list-group list-group-flush fs-6">
                    <li className="list-group-item ">
                      <input
                        type="checkbox"
                        checked={camera.includes("12 MP")}
                        onChange={() => toggleCamera("12 MP")}
                        data-testid="camera-checkbox1"
                        className="me-2"
                      />
                      12 MP
                    </li>
                    <li className="list-group-item ">
                      <input
                        type="checkbox"
                        checked={camera.includes("50 MP")}
                        onChange={() => toggleCamera("50 MP")}
                        data-testid="camera-checkbox2"
                        className="me-2"
                      />
                      50 MP
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Remaining Css */}
            <div className="accordion-item bg-light">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  style={{
                    fontSize: "25px",
                    fontFamily: "sans-serif",
                    color: "#4d4c4c",
                  }}
                >
                  Storage
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  <ul
                    className="list-group list-group-flush fs-6"
                    // style={{ fontSize: "15px", textAlign: "left" }}
                  >
                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        checked={storage.includes("128 GB")}
                        onChange={() => toggleStorage("128 GB")}
                        data-testid="storage-checkbox1"
                        className="me-2"
                        // style={{ marginRight: "20px" }}
                      />
                      128 GB
                    </li>
                    <li className="list-group-item ">
                      <input
                        type="checkbox"
                        checked={storage.includes("256 GB")}
                        data-testid="storage-checkbox2"
                        onChange={() => toggleStorage("256 GB")}
                        style={{ marginRight: "10px" }}
                      />
                      256 GB
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-light">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  style={{
                    fontSize: "25px",
                    fontFamily: "sans-serif",
                    color: "#4d4c4c",
                  }}
                >
                  Color
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul
                    className="list-group list-group-flush"
                    style={{ fontSize: "15px", textAlign: "left" }}
                  >
                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        checked={color.includes("Black")}
                        onChange={() => toggleColor("Black")}
                        style={{ marginRight: "20px" }}
                        data-testid="color-checkbox1"
                      />
                      Black
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        marginRight: "100px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={color.includes("Blue")}
                        onChange={() => toggleColor("Blue")}
                        data-testid="color-checkbox2"
                        style={{ marginRight: "20px" }}
                      />
                      Blue
                    </li>
                    <li
                      className="list-group-item"
                      style={{
                        marginRight: "90px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={color.includes("Green")}
                        onChange={() => toggleColor("Green")}
                        data-testid="color-checkbox3"
                        style={{ marginRight: "20px" }}
                      />
                      Green
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {Buttons Filter} */}

        <div className="col-12 col-md-9 mt-5">
          <div
            className="d-flex flex-column position-sticky top-0 p-3 bg-light shadow-sm"
            style={{ zIndex: 1 }}
          >
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-outline-secondary border-1"
                onClick={filterByApple}
                // style={{ border: "1px solid", marginRight: "5px" }}
              >
                Apple
              </button>
              <button
                className="btn btn-outline-secondary border-1"
                onClick={filterBySamsung}
                //style={{ border: "1px solid", marginRight: "5px" }}
              >
                Samsung
              </button>
              <button
                className="btn btn-outline-secondary border-1"
                onClick={filterByOneplus}
                //style={{ border: "1px solid", marginRight: "5px" }}
              >
                OnePlus
              </button>

              <button
                className="btn btn-outline-secondary border-1"
                onClick={filterByGooglePixel}
                // style={{ border: "1px solid", marginRight: "5px" }}
              >
                GooglePixel
              </button>
            </div>
            <div className="w-100 text-end fs-5">
              <p>{filteredMobiles.length} Results</p>
            </div>

            {/* Close button to reset filters */}
            {isAnyCheckboxChecked && (
              <div className="d-flex flex-wrap gap-2 mt-1">
                {brand.map((b) => (
                  <div key={b}>
                    <button
                      className="btn btn-outline-dark border-1"
                      onClick={() => clearFilters(b)}
                    >
                      {b} <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="container-fluid mt-3">
            <div className="row justify-content-center">
              {filteredMobiles.map((mobile) => {
                const { mobileId, brand, model, price, storage, imageUrl } =
                  mobile;
                return (
                  <div key={mobileId} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 p-3">
                      <div
                        onClick={() => navigate(`/mobile/${mobileId}`)}
                        data-testid="image-test"
                        className="card shadow-sm border-0 rounded-3 overflow-hidden"
                        style={{ cursor: "pointer", height: "100%" }}
                      >
                        <img
                          src={imageUrl}
                          className="card-img-top"
                          alt={`${model}.jpg`}
                          style={{
                            height: "230px",

                            borderBottom: "1px solid #ddd",
                          }}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h2 className="card-title">{model}</h2>
                        <ul className="list-group list-group-flush flex-grow-1">
                          <li className="list-group-item">
                            <h5 className="text-muted">{storage}</h5>
                            <h5 className="text-muted">{brand}</h5>
                            <p className="text-muted">
                              Starts at{" "}
                              <strong>₹{(price / 12).toFixed(2)}</strong> /mo
                            </p>
                            <p className="text-muted">For 12 months, % APR</p>
                            <p className="text-muted">
                              Retail price: ₹<strong>{price}</strong>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Mobiles;
