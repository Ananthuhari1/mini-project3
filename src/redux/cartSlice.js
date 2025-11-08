
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (!existing) {
        state.cartItems.push(action.payload);
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
