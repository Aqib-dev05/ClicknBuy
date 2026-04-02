import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtected() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    // Optionally return a loader if global App loader isn't enough
    return null; 
  }

  if (user?.role === "admin") {
    return <Outlet />;
  }

  // If not admin, redirect to login or home
  return <Navigate to="/login" replace />;
}

export default AdminProtected;
