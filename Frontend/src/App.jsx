import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainLayout, SecondaryLayout, AuthLayout } from "./Components/Layout";
import UserProtected from "./Components/protectedChecker/UserProtected.jsx";
import ScrollToTop from "./Components/layouts/ScrollToTop.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import {
  AboutPage,
  CartPage,
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
  SubCategoryPage
} from "./Pages/index.js";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, setLoading, setError } from "./Redux/Slices/authSlics.js";
import api from "./api/api.js";
import { HashLoader } from "react-spinners";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    toast.dismiss();
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        if (user) return;
        const res = await api.get("/auth/me");
        dispatch(setUser(res.data.user));
      } catch (err) {
        // Vercel/production me backend na ho to `err.response` undefined hota hai.
        // Isliye safe error message set karna zaroori hai (warna React crash = blank screen).
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";
        dispatch(setError(message));
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, []);



  if (loading) return <div className=" w-[100vw] h-[100vh] flex justify-center items-center text-4xl bg-amber-200 ">
    <HashLoader className="mt-16" />
  </div>


  if (user?.role === "admin") return (
    <>
      <p>admin panel</p>
    </>
  )


  return (
    <>
      <ScrollToTop />
      {window.innerWidth > 768 && <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        limit={3}
        theme="dark"
      />}

      <ErrorBoundary>
        <Routes>
          {/* public routes  */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/subcategories" element={<SubCategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<Faq />} />

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
            <Route path="/terms-and-conditions" element={<TermAndConditions />} />
            <Route path="/privacy-policy" element={<PrivayPolicy />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
