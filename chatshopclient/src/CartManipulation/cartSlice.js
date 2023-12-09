import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
