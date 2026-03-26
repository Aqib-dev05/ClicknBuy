import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, UserRound, IdCard, PencilLine, Settings } from "lucide-react";
import { useProfileContext } from "./profileContext";

function ProfileSidebar() {
  const { activeTab, setActiveTab, setIsSidebarOpen, isSidebarOpen } = useProfileContext();
  const items = [
    { id: "profileHeader", label: "Profile Header", icon: UserRound },
    { id: "profileDetails", label: "Profile Details", icon: IdCard },
    { id: "editProfile", label: "Edit Profile", icon: PencilLine },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-white rounded-2xl shadow-sm p-3 sm:p-4 ${
        isSidebarOpen ? "block" : "hidden"
      } lg:block`}
    >
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                isActive
                  ? "bg-[rgb(219,68,68)] text-white"
                  : "text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-5 pt-4 border-t border-gray-200 space-y-2">
        <Link
          to="/cart"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"
        >
          <ShoppingCart size={18} />
          <span>My Cart</span>
        </Link>
        <Link
          to="/wishlist"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"
        >
          <Heart size={18} />
          <span>Wishlist</span>
        </Link>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
