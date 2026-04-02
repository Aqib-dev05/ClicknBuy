import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Layers, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/authSlics";
import { logOut } from "../../services/authService";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error(err);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Categories", path: "/admin/categories", icon: Tags },
    { name: "Subcategories", path: "/admin/subcategories", icon: Layers },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold font-serif text-[rgb(219,68,68)]">Admin Panel</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-sm flex-shrink-0 md:h-screen md:sticky md:top-0 z-50`}
      >
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold font-serif text-[rgb(219,68,68)] text-center">Admin Panel</h1>
        </div>
        
        <nav className="p-4 space-y-2 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[rgb(219,68,68)] text-white font-semibold shadow-md"
                      : "text-gray-700 hover:bg-red-50 hover:text-[rgb(219,68,68)]"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto md:absolute md:bottom-0 w-full">
           <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-[rgb(219,68,68)] transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 min-h-[80vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
