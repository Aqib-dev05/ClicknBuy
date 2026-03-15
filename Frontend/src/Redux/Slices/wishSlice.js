import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.wishlist.find((it) => it._id === item._id);
      if (!exists) {
        state.wishlist.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.wishlist = state.wishlist.filter((it) => it._id !== itemId);
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
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
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
  setLoading,
  setError,
} = wishSlice.actions;

export default wishSlice.reducer;
