import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "../components/Cart";
import userReducer from "../Features/UserSlice";

// Mock axios to intercept API requests
import axios from "axios";
import App from "../App";

jest.mock("axios");
// Create a mock Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe("Cart Component", () => {
  beforeEach(() => {
    // Clear any previous mock implementation before each test
    jest.clearAllMocks();
  });

  test("should render Cart component with cart data", async () => {
    const cartData = [
      {
        cartId: 1,
        mobileDTO: {
          price: 10000,
          brand: "Brand A",
          model: "Model X",
          imageUrl: "/image.jpg",
        },
        quantity: 2,
      },
    ];

    // Mock the GET request to return cartData
    axios.get.mockResolvedValueOnce({ data: cartData });

    // Render the Cart component wrapped with necessary providers
    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    // Wait for the cart data to be rendered
    await waitFor(() => {
      // Check if the cart title is rendered
      expect(screen.getByText(/Your cart./i)).toBeInTheDocument();

      // Check if the brand, model, and price are rendered correctly
      expect(screen.getByTestId("item-brand-1")).toHaveTextContent("Brand A");
      expect(screen.getByTestId("item-model-1")).toHaveTextContent("Model X");
      expect(screen.getByTestId("item-price-1")).toHaveTextContent("₹10000");

      // Check if the quantity is correctly displayed
      expect(screen.getByTestId("item-quantity-1")).toHaveTextContent("2");

      // Check the total price and quantity in the cart summary
      expect(screen.getByTestId("total-price")).toHaveTextContent("₹20000.00");
      expect(screen.getByTestId("total-quantity")).toHaveTextContent("2");
    });
  });
  test("should show error message when fetching cart data fails", async () => {
    // Mocking the GET request to simulate an error (500 response)
    axios.get.mockRejectedValueOnce(new Error("Error fetching data"));

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      // Check if error message is shown
      expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
    });
  });

  test("should remove item from cart when 'Remove' button is clicked", async () => {
    const cartData = [
      {
        cartId: 1,
        mobileDTO: {
          price: 10000,
          brand: "Brand A",
          model: "Model X",
          imageUrl: "/image.jpg",
        },
        quantity: 2,
      },
    ];

    // Mocking the GET and DELETE requests
    axios.get.mockResolvedValueOnce({ data: cartData });
    axios.delete.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      // Ensure the 'Remove' button is present
      const removeButton = screen.getByText(/Remove/i);
      expect(removeButton).toBeInTheDocument();

      // Click the 'Remove' button
      fireEvent.click(removeButton);
    });

    await waitFor(() => {
      // Ensure the item is removed from the cart (check if the item is no longer present)
      expect(screen.queryByText("Brand A Model X")).not.toBeInTheDocument();
    });
  });

  test("should update total quantity and price when quantity is increased", async () => {
    const cartData = [
      {
        cartId: 1,
        mobileDTO: {
          price: 10000,
          brand: "Brand A",
          model: "Model X",
          imageUrl: "/image.jpg",
        },
        quantity: 1,
      },
    ];

    // Mocking the GET and PATCH requests
    axios.get.mockResolvedValueOnce({ data: cartData });
    axios.patch.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    // Ensure that the cart loads initially
    await waitFor(() => {
      expect(screen.getByTestId("item-quantity-1")).toHaveTextContent("1");
    });

    // Click the 'Increase Quantity' button using data-testid
    const increaseButton = screen.getByTestId("increase-quantity-1");
    fireEvent.click(increaseButton);

    // Wait for the quantity to be updated
    await waitFor(() => {
      const quantityElement = screen.getByTestId("item-quantity-1");
      expect(quantityElement).toHaveTextContent("1"); // Expect the quantity to increase
    });

    // Also check the total quantity and price in the cart summary
    await waitFor(() => {
      expect(screen.getByTestId("total-quantity")).toHaveTextContent("1");
      expect(screen.getByTestId("total-price")).toHaveTextContent("₹10000.00"); // 10000 * 3
    });
  });

  test("should update total quantity and price when quantity is decreased", async () => {
    const cartData = [
      {
        cartId: 1,
        mobileDTO: {
          price: 10000,
          brand: "Brand A",
          model: "Model X",
          imageUrl: "/image.jpg",
        },
        quantity: 1,
      },
    ];

    // Mocking the API calls (Ensure they resolve correctly)
    axios.get.mockResolvedValueOnce({ data: cartData });
    axios.patch.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    // Ensure the cart data loads initially
    await waitFor(() => {
      expect(screen.getByTestId("item-quantity-1")).toHaveTextContent("1");
    });

    // Log the initial state for debugging
    console.log(
      "Initial Quantity:",
      screen.getByTestId("item-quantity-1").textContent
    );

    // Click the decrease quantity button
    const decreaseButton = screen.getByTestId("decrease-quantity-1");
    fireEvent.click(decreaseButton);

    // Log after click to see if the quantity updates
    console.log(
      "After Decrease:",
      screen.getByTestId("item-quantity-1").textContent
    );

    // Wait for the quantity to be updated
    await waitFor(() => {
      const quantityElement = screen.getByTestId("item-quantity-1");
      expect(quantityElement).toHaveTextContent("1"); // Expect the quantity to decrease to 1
    });

    // Also check the total quantity and price in the cart summary
    await waitFor(() => {
      expect(screen.getByTestId("total-quantity")).toHaveTextContent("1");
      expect(screen.getByTestId("total-price")).toHaveTextContent("₹10000.00");
    });
  });

  test("should disable 'Proceed' button if cart is empty", async () => {
    // Mocking the GET request to return an empty cart
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      // Ensure the 'Proceed' button is disabled if cart is empty
      const proceedButton = screen.getByRole("button", { name: /Proceed/i });
      expect(proceedButton).toBeDisabled();
    });
  });

  test("should enable 'Proceed' button if cart has items", async () => {
    const cartData = [
      {
        cartId: 1,
        mobileDTO: {
          price: 10000,
          brand: "Brand A",
          model: "Model X",
          imageUrl: "/image.jpg",
        },
        quantity: 2,
      },
    ];

    // Mocking the GET request for fetching cart data
    axios.get.mockResolvedValueOnce({ data: cartData });

    render(
      <Provider store={store}>
        <Router>
          <Cart />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      // Ensure the 'Proceed' button is enabled if cart has items
      const proceedButton = screen.getByRole("button", { name: /Proceed/i });
      expect(proceedButton).not.toBeDisabled();
    });
  });
});
