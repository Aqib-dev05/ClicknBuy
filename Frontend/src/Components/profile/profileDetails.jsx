import React from "react";
import { useProfileContext } from "./profileContext";

function ProfileDetails() {
  const { currentProfile } = useProfileContext();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Full Name</span>
          <span className="font-medium">{currentProfile?.name || "N/A"}</span>
        </p>
        <p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Email</span>
          <span className="font-medium">{currentProfile?.email || "N/A"}</span>
        </p>
        <p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Phone</span>
          <span className="font-medium">{(currentProfile?.phone) || "N/A"}</span>
        </p>
        </div>
        <br /><br />


        <div className="flex flex-col gap-4"> 
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Address </h2>
        <p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Country</span>
          <span className="font-medium">{currentProfile?.address?.country || "N/A"}</span>
        </p>
        <p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">City</span>
          <span className="font-medium">{currentProfile?.address?.city || "N/A"}</span>
        </p><p className="bg-gray-200 rounded-xl p-4">
          <span className="block text-sm text-gray-500">Postal Code</span>
          <span className="font-medium">{currentProfile?.address?.postalCode || "N/A"}</span>
        </p>
       
      </div>
    </div>
  );
}

export default ProfileDetails;
