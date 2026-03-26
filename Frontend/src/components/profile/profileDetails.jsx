import React from "react";
import { useProfileContext } from "./profileContext";

function ProfileDetails() {
  const { currentProfile } = useProfileContext();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p className="bg-gray-50 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Full Name</span>
          <span className="font-medium">{currentProfile?.name || "N/A"}</span>
        </p>
        <p className="bg-gray-50 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Email</span>
          <span className="font-medium">{currentProfile?.email || "N/A"}</span>
        </p>
        <p className="bg-gray-50 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Phone</span>
          <span className="font-medium">{currentProfile?.phone || "N/A"}</span>
        </p>
        <p className="bg-gray-50 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Role</span>
          <span className="font-medium capitalize">{currentProfile?.role || "user"}</span>
        </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
