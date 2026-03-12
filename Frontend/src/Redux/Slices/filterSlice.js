import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "",
  category: "",
  sub: "",
  sortBy: "",
  page: 1,
  limit: 20,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      Object.assign(state, action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, setPage, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
