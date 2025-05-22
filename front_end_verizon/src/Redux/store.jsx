import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userReducer from "../Features/UserSlice";

// Step 1: Configure the store with the persisted user reducer
export const store = configureStore({
  reducer: {
    user: userReducer, // Use the persisted reducer
  },
});

// Step 2: Create the persistor
export const persistor = persistStore(store); // Export the persistor
