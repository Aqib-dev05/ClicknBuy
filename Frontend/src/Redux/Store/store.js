import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/cartSlice";
import authReducer from "../Slices/authSlics";
import profileReducer from "../Slices/profileSlice";
import productReducer from "../Slices/productSlice";
import filterReducer from "../Slices/filterSlice";
import wishReducer from "../Slices/wishSlice";
 
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        profile: profileReducer,
        products: productReducer,
        filter: filterReducer,
        wishlist: wishReducer,
    },
});
