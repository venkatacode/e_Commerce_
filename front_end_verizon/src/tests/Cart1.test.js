import { Provider } from "react-redux";
import { store } from "../Redux/store";
import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const mockedUser = {
  userId: 6,
  userName: "manu",
  userEmail: "manu@gmail.com",
  password: "manu@1234",
  fullName: "Manasa B",
  address: "mogilicherla",
  state: "AP",
  city: "Ongole",
  phoneNo: 987867897,
  country: "India",
  pincode: 520011,
};
const mockedMobiles = [
  {
    brand: "samsung",
    model: "S22",
    price: 80000,
    displaySize: "8inch",
    processor: "octaProcessor",
    ram: "8gb",
    storage: "128GB",
    camera: "125px",
    battery: "7000mah",
    imageUrl:
      "https://th.bing.com/th/id/OIP.35WBQMoiBmHUpQoo-CqkggHaE0?rs=1&pid=ImgDetMain",
    color: "blue",
  },
  {
    brand: "Apple",
    model: "iPhone 16 Pro",
    price: 80000,
    displaySize: "8inch",
    processor: "octaProcessor",
    ram: "8gb",
    storage: "128GB",
    camera: "125px",
    battery: "7000mah",
    imageUrl:
      "https://th.bing.com/th/id/OIP.35WBQMoiBmHUpQoo-CqkggHaE0?rs=1&pid=ImgDetMain",
    color: "blue",
  },
];

const mockedCart = [
  {
    cartId: 124,
    quantity: 1,
    userDTO: mockedUser,
    mobileDTO: mockedMobiles[0],
  },
];

describe("All - Cart component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Decrement quantity", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    axios.get.mockImplementation((url) => {
      console.log(url);

      if (url === `http://localhost:8080/verizon/cart/${mockedUser.userId}`) {
        return Promise.resolve({ data: mockedCart });
      }
    });
    axios.get.mockResolvedValueOnce({ data: mockedMobiles[0] });
    axios.post.mockResolvedValueOnce({ data: mockedUser });
    axios.get.mockResolvedValueOnce({ data: mockedMobiles });
    await waitFor(() => {
      expect(
        screen.queryByText("Our Latest Offers For you")
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/SignIn/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/SignIn/i));
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    const userName = screen.getByRole("textbox", { name: /User Name:/i });
    const passwordBox = screen.getByTestId("test-password");
    userEvent.type(userName, mockedUser.userName);
    userEvent.type(passwordBox, mockedUser.password);

    await waitFor(() => {
      userEvent.click(screen.getByTestId("logintest"));
    });
    expect(screen.queryByText("Our Latest Offers For you")).toBeInTheDocument();
    userEvent.click(await screen.findByText(/Mobiles/i));
    expect(screen.getByText(/Lowest Prices/i)).toBeInTheDocument();

    expect(await screen.findByText(/S22/i)).toBeInTheDocument();
    userEvent.click(screen.getAllByTestId("image-test")[0]);
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Add to Cart/i));
    expect(screen.getByTestId("carttest")).toBeInTheDocument();
    console.log(screen.getByTestId("carttest").outerHTML);

    await waitFor(() => {
      userEvent.click(screen.getByTestId("carttest"));
    });
  });
});
