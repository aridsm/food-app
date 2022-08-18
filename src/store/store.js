import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertStore";
import cartSlice from "./cartStore";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, alert: alertSlice.reducer }
})

export default store;