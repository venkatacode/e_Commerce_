import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MobileDetials from "./MobileDetails";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mock Axios
jest.mock("axios");

describe("MobileDetials Component", () => {
  test("Message disappears after 5 seconds", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ brand: "Apple", model: "iPhone 14", price: 799 }],
    }); // Mocking product details
    axios.post.mockResolvedValueOnce({}); // Mocking successful add to cart

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileDetials />
        </MemoryRouter>
      </Provider>
    );

    // Wait for mobile details to be loaded
    await waitFor(() => screen.getByText(/iPhone 14/));

    const addToCartButton = screen.getByTestId("cart-btncheck");
    fireEvent.click(addToCartButton);

    // Wait for the message to disappear
    await waitFor(
      () => {
        expect(
          screen.queryByText("Item added to cart!")
        ).not.toBeInTheDocument();
      },
      { timeout: 6000 }
    );
  });
});
