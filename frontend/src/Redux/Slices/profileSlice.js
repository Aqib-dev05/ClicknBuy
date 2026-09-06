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
    resetProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const { setProfile, setLoading, setError, updateProfileLocal, resetProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
