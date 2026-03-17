import React from "react";
import { useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import { Routes, Route,useLocation } from "react-router-dom";
import { MainLayout, SecondaryLayout, AuthLayout } from "./Components/layout";
import UserProtected from "./Components/protectedChecker/UserProtected.jsx";
import AdminProtected from "./Components/protectedChecker/AdminProtected.jsx";

import {
  AboutPage,
  CartPage,
  SingleCategoryPage,
  CategoryPage,
  ContactPage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  HomePage,
  ProductsPage,
  ProfilePage,
  SingleProductPage,
  WishListPage,
  Faq,
  TermAndConditions,
  PrivayPolicy,
} from "./Pages/index.js";

import { useDispatch } from "react-redux";
import { setUser, logout } from "./Redux/Slices/authSlics.js";
import api from "./api/api.js";

function App() {

   const dispatch = useDispatch();
   const location = useLocation()

  useEffect(() => {
    toast.dismiss()
  }, [location])

  useEffect(() => {

    api.get("/auth/me")
      .then(res => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => {
        dispatch(logout());
      });

  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* public routes  */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/category/:category" element={<SingleCategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* user protected routes */}
         <Route element={<UserProtected />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
         </Route>


        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<SecondaryLayout />}>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms-and-conditions" element={<TermAndConditions />} />
          <Route path="/privacy-policy" element={<PrivayPolicy />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
