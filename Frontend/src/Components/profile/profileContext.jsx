/* eslint react-refresh/only-export-components: off */
import React, { createContext, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../../services/authService.js";
import { logout } from "../../Redux/Slices/authSlics";
import { setProfile } from "../../Redux/Slices/profileSlice";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState("profileHeader");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentProfile = profile || user || {};

  const handleLogout = async () => {
    try {
     const res = await logOut();
if(res){
dispatch(logout());
      dispatch(setProfile(null));
      toast.success("Logged out successfully");
      navigate("/login");
}
    } catch(error) {
      console.log(error);
toast.info(error.response?.data?.message || error.response?.data || "Failed to Logout");
    } 
  };

  const value = useMemo(
    () => {
      const currentProfile = profile || user || {};
      return {
        user,
        currentProfile,
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setIsSidebarOpen,
        isSubmitting,
        setIsSubmitting,
        handleLogout,
        dispatch,
        navigate,
      };
    },
    [user, profile, activeTab, isSidebarOpen, isSubmitting, dispatch, navigate]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }
  return context;
}

export { ProfileProvider, useProfileContext };
