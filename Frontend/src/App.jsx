import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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

// Admin Components
import AdminProtected from "./Components/admin/AdminProtected.jsx";
import AdminDashboard from "./Components/admin/AdminDashboard.jsx";
import ProductTable from "./Components/admin/ProductTable.jsx";
import AddProduct from "./Components/admin/AddProduct.jsx";
import EditProduct from "./Components/admin/EditProduct.jsx";
import CategoryTable from "./Components/admin/CategoryTable.jsx";
import SubCategoryTable from "./Components/admin/SubCategoryTable.jsx";
import UserTable from "./Components/admin/UserTable.jsx";
import Reports from "./Components/admin/Reports.jsx";
import AddCategory from "./Components/admin/AddCategory.jsx";
import EditCategory from "./Components/admin/EditCategory.jsx";
import AddSubCategory from "./Components/admin/AddSubCategory.jsx";
import EditSubCategory from "./Components/admin/EditSubCategory.jsx";
import ProductView from "./Components/admin/ProductView.jsx";
import EditAdminProfile from "./Components/admin/EditAdminProfile.jsx";

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
  }, [dispatch, user]);



  if (loading) return <div className=" w-[100vw] h-[100vh] flex justify-center items-center text-4xl bg-amber-200 ">
    <HashLoader className="mt-16" />
  </div>


  // Admin logic handled by AdminProtected and Navigate below

  return (
    <>
      <ScrollToTop />
      {<ToastContainer
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
          {/* Admin routes handled by AdminProtected wrapper and Navigate-check for isolation */}
          {user?.role === "admin" && (
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          )}

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

          {/* Admin routes protected by AdminProtected */}
          <Route element={<AdminProtected />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Reports />} />
              <Route path="products" element={<ProductTable />} />
              <Route path="products/:id" element={<ProductView />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="categories" element={<CategoryTable />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/edit/:id" element={<EditCategory />} />
              <Route path="subcategories" element={<SubCategoryTable />} />
              <Route path="subcategories/add" element={<AddSubCategory />} />
              <Route path="subcategories/edit/:id" element={<EditSubCategory />} />
              <Route path="users" element={<UserTable />} />
              <Route path="reports" element={<Reports />} />
              <Route path="/admin/edit-profile" element={<EditAdminProfile />} />
            </Route>
          </Route>

          {/* Auth layout is standalone */}
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
