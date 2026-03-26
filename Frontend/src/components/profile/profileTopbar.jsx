import React from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useProfileContext } from "./profileContext";
import Button from "../layouts/Button";

function ProfileTopbar() {
  const { isSidebarOpen, setIsSidebarOpen, handleLogout } = useProfileContext();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <button
          className="lg:hidden p-2 rounded-lg border border-gray-200"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">My Profile Dashboard</h1>
      </div>
      
      <Button onClick={handleLogout} text={<LogOut size={18} />} icon={"Logout"} className="rounded-lg" />
    </div>
  );
}

export default ProfileTopbar;
