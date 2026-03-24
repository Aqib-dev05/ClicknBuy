import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfileLocal: (state, action) => {
      if (!state.profile) state.profile = {};
      Object.assign(state.profile, action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProfile, setLoading, setError, updateProfileLocal } =
  profileSlice.actions;

export default profileSlice.reducer;
