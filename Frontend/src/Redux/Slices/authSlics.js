import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: true,
    error: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },  
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; 
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            state.loading = false; 
        },
    },
});

export const { setUser, setToken, logout, setLoading, setError, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;