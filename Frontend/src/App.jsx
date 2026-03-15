import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { MainLayout, SecondaryLayout } from "./Components/layout"
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
  PrivayPolicy
} from "./Pages/index.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoryPage />} />

          <Route path="/products/:id" element={<SingleProductPage />} />

          <Route path="/category/:category" element={<SingleCategoryPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/wishlist" element={<WishListPage />} />

          <Route path="/profile" element={<ProfilePage />} />


          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

        </Route>

        <Route element={<SecondaryLayout />} >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms-and-conditions" element={<TermAndConditions />} />
          <Route path="/privacy-policy" element={<PrivayPolicy />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;
