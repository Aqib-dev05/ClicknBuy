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
  const cart = action.payload; // poora cart object from backend

  // products array store karna
  state.cartItems = cart.products || [];

  // total quantity calculate
  state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // total price calculate
  state.totalPrice = state.cartItems.reduce((acc, item) => {
    const price = item.product.discountedPrice || item.product.basePrice;
    return acc + price * item.quantity;
  }, 0);
},
    removeFromCartRedux: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((it) => it._id == itemId);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((it) => it._id != itemId);
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
      }
    },
    clearCartRedux: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    updateCartItemQuantityRedux: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.cartItems.find((it) => it._id == itemId);
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
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
