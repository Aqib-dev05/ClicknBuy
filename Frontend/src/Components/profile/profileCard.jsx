import React, { useMemo } from "react";
import { useProfileContext } from "./profileContext";
import { formatPhone } from "../../Validators/phoneVal"
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer"

function ProfileCard() {
  const { currentProfile } = useProfileContext();
  const memberSince = useMemo(() => {
    const dateValue = currentProfile?.createdAt;
    if (!dateValue) return "N/A";
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime()) ? "N/A" : parsed.toLocaleDateString();
  }, [currentProfile?.createdAt]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-md">
      <div className="flex flex-col items-center text-center">
        <img
          src={
            cloudinaryOptimizer(currentProfile?.avatar?.url) ||
            "https://res.cloudinary.com/dvfdxbzem/image/upload/v1774003344/default.png"
          }
          alt={currentProfile?.name.charAt(0).toUpperCase() + currentProfile?.name.slice(1)}
          loading="lazy"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
        />
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl bg-gray-200 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
          <p className="mt-1 text-gray-900 font-semibold">{currentProfile?.name || "User"}</p>
        </div>
        <div className="rounded-xl bg-gray-200 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
          <p className="mt-1 text-gray-900 break-all">{currentProfile?.email || "No email found"}</p>
        </div>
        <div className="rounded-xl bg-gray-200 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
          <p className="mt-1 text-gray-900">{formatPhone(currentProfile?.phone) || "N/A"}</p>
        </div>
        <div className="rounded-xl bg-gray-200 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Address (city) </p>
          <p className="mt-1 text-gray-900">
            {currentProfile?.address
              ? `${currentProfile?.address?.city}`
              : "N/A"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-200 p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Member Since</p>
          <p className="mt-1 text-gray-900">{memberSince}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;