import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartRedux: (state, action) => {
      const cart = action.payload;
      state.cartItems = (cart.products || []).filter(item => item.product);
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.totalPrice = state.cartItems.reduce((acc, item) => {
        const price = item.product.discountedPrice || item.product.basePrice;
        return acc + price * item.quantity;
      }, 0);
    },

    removeFromCartRedux: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(
        (it) => it.product._id === itemId,
      );

      if (existingItem) {
        const price =
          existingItem.product.discountedPrice ||
          existingItem.product.basePrice;

        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= price * existingItem.quantity;

        state.cartItems = state.cartItems.filter(
          (it) => it.product._id !== itemId,
        );
      }
    },

    clearCartRedux: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    updateCartItemQuantityRedux: (state, action) => {
      const { itemId, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (it) => it.product._id === itemId,
      );

      if (existingItem) {
        existingItem.quantity = quantity;

        // recalc totals
        state.totalQuantity = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );

        state.totalPrice = state.cartItems.reduce((acc, item) => {
          const price = item.product.discountedPrice || item.product.basePrice;
          return acc + price * item.quantity;
        }, 0);
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToCartRedux,
  removeFromCartRedux,
  clearCartRedux,
  updateCartItemQuantityRedux,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
