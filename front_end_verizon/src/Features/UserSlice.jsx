import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Step 1: Set up the persist configuration
const persistConfig = {
  key: "user",
  storage,
};

const initialState = {
  userData: null,
  cartCount: 0,
};

// Step 2: Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    removeUser: (state) => {
      state.userData = null;
    },
    addTotalCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    addCartItem: (state) => {
      state.cartCount += 1;
    },
    removeCartItem: (state) => {
      state.cartCount -= 1;
    },
    removeTotalCartCount: (state, action) => {
      state.cartCount -= action.payload;
    },
  },
});

// Step 3: Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const {
  addUser,
  removeUser,
  addTotalCartCount,
  addCartItem,
  removeCartItem,
  removeTotalCartCount,
} = userSlice.actions;

// Step 4: Export the persisted reducer
export default persistedReducer;
