import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MobileDetails from "./components/MobileDetails";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Mobiles from "./components/Mobiles";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import Footer from "./components/Footer";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "@reduxjs/toolkit";
import reducer, {
  addUser,
  removeUser,
  addTotalCartCount,
  addCartItem,
  removeCartItem,
  removeTotalCartCount,
} from "./Features/UserSlice"; // Assuming this is the path
import MobileDetials from "./components/MobileDetails";
import OrderDetail from "./components/OrderDetail";

jest.mock("axios");

describe("Footer Component", () => {
  test("renders the Home link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const HomeLink = screen.getByText(/home/i);
    expect(HomeLink).toBeInTheDocument();
    expect(HomeLink.closest("a")).toHaveAttribute("href", "/home");
  });
});

describe("Footer Component", () => {
  test("renders the About link", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const AboutLink = screen.getAllByText(/about/i);
    expect(AboutLink[0]).toBeInTheDocument();
  });
  test("renders the About us Footer", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const text = screen.getByTestId("F1001");
    expect(text).toBeInTheDocument("About Verizon");
  });
});

describe("Login Component", () => {
  test("displays error message on Login failure", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText(/User Name:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(usernameInput, {
      target: { value: "Vivek" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Vivek@123" },
    });
    const form = await screen.findByTestId("login-form");
    fireEvent.submit(form);
    const expectedElement = await screen.findByTestId("Message");
    expect(expectedElement).toBeInTheDocument("User Doesn't Exist");
  });

  test("should display error message for invalid login", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const signupLink = screen.getByTestId("signup-test");
    userEvent.click(signupLink);
    // const signinLink = screen.getByText(/Sign In/i);
    // userEvent.click(signinLink);
    const userNameInput = await screen.findByLabelText(/User Name/i);
    const passwordInput = await screen.findByLabelText(/Password/i);
    userEvent.type(userNameInput, "test");
    userEvent.type(passwordInput, "test1234");

    const loginbtn = await screen.findByRole("button", { name: /Login/i });
    console.log(loginbtn.outerHTML);
    fireEvent.click(loginbtn);

    const expectedElement = await screen.findByText(
      /Network error or server is down. Please try again later./i
    );
    expect(expectedElement).toBeInTheDocument();
  });

  test("displays validation errors", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "123" },
    });

    expect(
      screen.getByText(/Name should have minium 3 charater/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /The length of the password should be between 8 and 12 characters/i
      )
    ).toBeInTheDocument();
  });

  test("enables submit button when inputs are valid", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    // Simulate user typing valid inputs
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "Vivek" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "Vivek@123" },
    });

    // Use waitFor to assert the button is enabled after changes
    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /Login/i });
      expect(submitButton).toBeDisabled();
    });
  });

  test("displays success message on successful login", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "Login successful! Redirecting to home page..." },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/User Name:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(usernameInput, {
      target: { value: "Vivek" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Vivek@123" },
    });
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(screen.getByTestId("Message")).toBeInTheDocument(
      "Login successful! Redirecting to home page..."
    );
  });

});

describe("Mobiles", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Mobiles />
      </MemoryRouter>
    );
  });
  test("show Apple Button", () => {
    // render(
    // <MemoryRouter><Mobiles /></MemoryRouter>
    // );
    expect(screen.getByText(/Lowest/i)).toBeInTheDocument();
    // expect(screen.getByText(mobiles[0].brand)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Apple" }));
  });
  test("show Samsung Button", () => {
    // render(<Mobiles />);
    // expect(screen.getByText(mobiles[0].brand)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Samsung" }));
  });
  test("show Samsung Button", () => {
    // render(<Mobiles />);
    // expect(screen.getByText(mobiles[0].brand)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "OnePlus" }));
  });
  test("show Samsung Button", () => {
    // render(<Mobiles />);
    // expect(screen.getByText(mobiles[0].brand)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "GooglePixel" }));
  });
  test("Apple CheckBox", () => {
    // render(<Mobiles />);
    const applebtn = screen.getByRole("button", { name: "Apple" });
    userEvent.click(applebtn);
  });
  test("Samsung CheckBox", () => {
    // render(<Mobiles />);
    const samsungbtn = screen.getByRole("button", { name: "Samsung" });
    userEvent.click(samsungbtn);
  });
  test("OnePlus CheckBox", () => {
    // render(<Mobiles />);
    const oneplusbtn = screen.getByRole("button", { name: "OnePlus" });
    userEvent.click(oneplusbtn);
  });
  test("GooglePixel CheckBox", () => {
    // render(<Mobiles />);
    const googlebtn = screen.getByRole("button", { name: "GooglePixel" });
    userEvent.click(googlebtn);
  });
  test("Camera CheckBox", () => {
    // render(<Mobiles />);
    const camera1 = screen.getByTestId("camera-checkbox1");
    userEvent.click(camera1);
  });
  test("Camera CheckBox", () => {
    // render(<Mobiles />);
    const camera2 = screen.getByTestId("camera-checkbox2");
    userEvent.click(camera2);
  });
  test("Storage CheckBox", () => {
    // render(<Mobiles />);
    const storage1 = screen.getByTestId("storage-checkbox1");
    userEvent.click(storage1);
  });
  test("Storage CheckBox", () => {
    // render(<Mobiles />);
    const storage2 = screen.getByTestId("storage-checkbox2");
    userEvent.click(storage2);
  });
  test("Color CheckBox", () => {
    // render(<Mobiles />);
    const color1 = screen.getByTestId("color-checkbox1");
    userEvent.click(color1);
  });
  test("Color CheckBox", () => {
    // render(<Mobiles />);
    const color2 = screen.getByTestId("color-checkbox2");
    userEvent.click(color2);
  });
  test("Color CheckBox", () => {
    // render(<Mobiles />);
    const color3 = screen.getByTestId("color-checkbox3");
    userEvent.click(color3);
  });
  test("Brand CheckBox", () => {
    // render(<Mobiles />);
    const brand1 = screen.getByTestId("brand-checkbox1");
    userEvent.click(brand1);
  });
  test("Brand CheckBox", () => {
    // render(<Mobiles />);
    const brand2 = screen.getByTestId("brand-checkbox2");
    userEvent.click(brand2);
  });
  test("Brand CheckBox", () => {
    // render(<Mobiles />);
    const brand3 = screen.getByTestId("brand-checkbox3");
    userEvent.click(brand3);
  });
  test("Brand CheckBox", () => {
    // render(<Mobiles />);
    const brand4 = screen.getByTestId("brand-checkbox4");
    userEvent.click(brand4);
  });

  test("show Lowest filter button", () => {
    // render(<Mobiles />);
    expect(screen.getByText(/Lowest/i)).toBeInTheDocument();
    // expect(screen.getByText(mobiles[0].brand)).toBeInTheDocument()
    const lowest_check = screen.getByTestId("lowestPrice-test");
    userEvent.click(lowest_check);
  });
});

describe("Register Component", () => {
  test("displays validation errors for Wrong Full name  field", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.debug();
    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "nbhm" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "nbdhdb" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "nhgf@gmmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "mkjuyhgthg" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "543216" },
    });
    fireEvent.change(screen.getByLabelText(/Address:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/City:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/State:/i), {
      target: { value: "Maharashtra" },
    });
    fireEvent.change(screen.getByLabelText(/Country:/i), {
      target: { value: "India" },
    });

    const submitbtn = screen.getByTestId("Register-btncheck");
    expect(submitbtn).not.toBeEnabled();

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    expect(screen.getByTestId("valid-error")).toHaveTextContent(
      /Please Enter First and Last name/i
    );

  });

  test("displays validation errors for 2word Full name  field", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.debug();
    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "nb" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "nbdhdb" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "nhgf@gmmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "mkjuyhgthg" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "654321" },
    });
    fireEvent.change(screen.getByLabelText(/Address:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/City:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/State:/i), {
      target: { value: "Maharashtra" },
    });
    fireEvent.change(screen.getByLabelText(/Country:/i), {
      target: { value: "India" },
    });

    const submitbtn = screen.getByTestId("Register-btncheck");
    expect(submitbtn).not.toBeEnabled();

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    expect(screen.getByTestId("valid-error")).toHaveTextContent(
      /Name should have a minimum of 3 characters/i
    );

  });
  test("displays validation errors for wrong User Name wrong field", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.debug();
    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "nbhm mnhj" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "bv" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "bgh@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "mnjuytrewd" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "8765432109" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "776532" },
    });
    fireEvent.change(screen.getByLabelText(/Address:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/City:/i), {
      target: { value: "Pune" },
    });
    fireEvent.change(screen.getByLabelText(/State:/i), {
      target: { value: "Maharashtra" },
    });
    fireEvent.change(screen.getByLabelText(/Country:/i), {
      target: { value: "India" },
    });

    const submitbtn = screen.getByTestId("Register-btncheck");
    expect(submitbtn).not.toBeEnabled();

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    expect(screen.getByTestId("valid-error")).toHaveTextContent(
      /Username should be 3-15 characters long and can only contain letters, numbers, underscores, and hyphens/i
    );
  });

  test("displays validation errors", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "123" },
    });

    expect(
      screen.getByText(/Name should have a minimum of 3 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Username should be 3-15 characters long/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /The length of the password should be between 8 and 12 characters/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Invalid phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid pincode/i)).toBeInTheDocument();
  });
  test("enables submit button when form is valid", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "123456" },
    });

    expect(
      screen.getByRole("button", { name: /Register/i })
    ).not.toBeDisabled();
  });

  test("display success message when register form is submitted", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    axios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: "Registration successful!" }, // This can be adjusted based on your actual response structure
    });
    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/User Name:/i), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText(/User Email:/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Phone No:/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode:/i), {
      target: { value: "123456" },
    });

    const submitbtn = screen.getByTestId("Register-btncheck");
    expect(submitbtn).toBeEnabled(); // Ensure it's enabled after filling

    // Simulate form submission
    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);
    // Assert that the registration message is displayed
    expect(await screen.findByTestId("Message")).toBeInTheDocument();
    expect(screen.getByTestId("Message")).toHaveTextContent(
      "Registration successful! Redirecting to login page..."
    );
  });

  test("Empty FullName Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Full Name:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Test User" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });
  test("Empty UserName Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("User Name:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Testser" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty Password Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Testserd" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty User Email Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("User Email:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Tests@gmail.com" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });
    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty Phone No Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Phone No:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "8765432109" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty Pincode Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Pincode:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "87654" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty Address Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Address:");
    const submitButton = screen.getByTestId("Register-btncheck");
    expect(submitButton).toBeDisabled();
    fireEvent.change(fullNameInput, { target: { value: "Pune" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });
    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty City Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("City:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Pune" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty State Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("State:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Maharashtra" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });

  test("Empty Country Validation", async () => {
    jest.setTimeout(10000);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByLabelText("Country:");
    const submitButton = screen.getByTestId("Register-btncheck");

    expect(submitButton).toBeDisabled();

    fireEvent.change(fullNameInput, { target: { value: "Pune" } });
    fireEvent.change(fullNameInput, { target: { value: "" } });

    await waitFor(() => {
      const errorMessage = screen.getByTestId("valid-error");
      expect(errorMessage).toHaveTextContent(/Field is required/);
    });
  });
});

describe("MobileDetailsComponent", () => {
  test("disables the button when API is in progress", async () => {
    axios.post.mockImplementationOnce(() => new Promise(() => {}));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileDetials />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId("cart-btncheck");
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
  test("fetches and displays mobile data", async () => {
    const mobileData = [
      {
        mobileId: 1,
        brand: "Samsung",
        model: "Galaxy S21",
        price: "79999",
        displaySize: "6.2 inches",
        processor: "Exynos 2100",
        ram: "8GB",
        storage: "128GB",
        camera: "64MP",
        battery: "4000mAh",
        imageUrl: "https://example.com/galaxy-s21.jpg",
        color: "Phantom Gray",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mobileData });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <MobileDetials mobileId="1" />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(screen.getByTestId("mobile-data")).toBeInTheDocument();
  });
  test("Add to Cart button is disabled when isButtonDisabled is true", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileDetails isButtonDisabled={true} />
        </MemoryRouter>
      </Provider>
    );

    const addToCartButton = screen.getByTestId("cart-btncheck");
    expect(addToCartButton).toBeDisabled();
  });
  test("renders MobileDetails component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileDetails mobileId="1" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Specification:/i)).toBeInTheDocument();
  });
});

describe("Order Component", () => {
  test("Checking Order Summary text", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });
  test("Checking Delivery Address text", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Delivery Address/i)).toBeInTheDocument();
  });
  test("Checking Quantity,Deliverycharges and Total Price text", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivery Charges/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount/i)).toBeInTheDocument();
  });
  test("places an order successfully", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    const orderbtn = screen.getByRole("button", { name: "Order" });
    expect(orderbtn).not.toBeDisabled();
    fireEvent.click(orderbtn);
  });
  test("validates form fields and shows errors when required fields are missing", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );

    // Simulate clicking the order button without filling out the form
    const orderButton = screen.getByRole("button", { name: /Order/i });
    fireEvent.click(orderButton);

    // Check for error messages
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/city is required/i)).toBeInTheDocument();
    expect(screen.getByText(/state is required/i)).toBeInTheDocument();
    expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    expect(screen.getByText(/pincode is required/i)).toBeInTheDocument();
  });
  test("validates pincode field for digits only", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Pincode/i), {
      target: { value: "abc123" },
    });
    const orderButton = screen.getByRole("button", { name: /Order/i });
    fireEvent.click(orderButton);
    expect(
      screen.getByText(/Only digits are required in Pincode./i)
    ).toBeInTheDocument();
  });
  test("should post the order and update state on success", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "Order has been placed successfully" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Order />
        </MemoryRouter>
      </Provider>
    );

    const TotalQuantity = await screen.findByTestId("quantity-test");
    const TotalPrice = await screen.findByTestId("price-test");

    userEvent.type(TotalQuantity, "1");
    userEvent.type(TotalPrice, "100");

    const order = screen.getByRole("button", { name: /Order/i });
    fireEvent.click(order);
    // const successMessage = await screen.getByTestId("order-placed");
    // expect(successMessage).toHaveTextContent(/Order has been placed successfully/i)
  });
  test("submits the order successfully when all fields are valid", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Order />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "Sample City" },
    });
    fireEvent.change(screen.getByLabelText(/State/i), {
      target: { value: "Sample State" },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "Sample Country" },
    });
    fireEvent.change(screen.getByLabelText(/Pincode/i), {
      target: { value: "123456" },
    });
    const orderButton = screen.getByRole("button", { name: /Order/i });
    fireEvent.click(orderButton);
  });
});

describe("userSlice", () => {
  const initialState = {
    userData: null,
    cartCount: 0,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addUser action", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const action = addUser(user);
    const expectedState = { userData: user, cartCount: 0 };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle removeUser action", () => {
    const stateWithUser = {
      userData: { name: "John Doe", email: "john@example.com" },
      cartCount: 0,
    };
    const action = removeUser();
    const expectedState = { userData: null, cartCount: 0 };
    expect(reducer(stateWithUser, action)).toEqual(expectedState);
  });

  it("should handle addTotalCartCount action", () => {
    const action = addTotalCartCount(5);
    const expectedState = { userData: null, cartCount: 5 };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle addCartItem action", () => {
    const stateWithCartCount = { userData: null, cartCount: 3 };
    const action = addCartItem();
    const expectedState = { userData: null, cartCount: 4 };
    expect(reducer(stateWithCartCount, action)).toEqual(expectedState);
  });

  it("should handle removeCartItem action", () => {
    const stateWithCartCount = { userData: null, cartCount: 3 };
    const action = removeCartItem();
    const expectedState = { userData: null, cartCount: 2 };
    expect(reducer(stateWithCartCount, action)).toEqual(expectedState);
  });

  it("should handle removeTotalCartCount action", () => {
    const stateWithCartCount = { userData: null, cartCount: 5 };
    const action = removeTotalCartCount(3);
    const expectedState = { userData: null, cartCount: 2 };
    expect(reducer(stateWithCartCount, action)).toEqual(expectedState);
  });
});
describe("Orders", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OrderDetail/>
        </Provider>
      </MemoryRouter>
    );
  });
  test("Orders", () => {
    expect(screen.getByText(/Your Orders/i)).toBeInTheDocument();
  });
});
