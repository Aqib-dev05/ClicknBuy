import React from "react";
import ProfileCard from "./profileCard";
import ProfileDetails from "./profileDetails";
import ProfileEditor from "./profileEditor";
import ProfileSettings from "./profileSettings";
import { useProfileContext } from "./profileContext";

function ProfileContent() {
  const { activeTab } = useProfileContext();

  if (activeTab === "profileHeader") return <ProfileCard />;
  if (activeTab === "profileDetails") return <ProfileDetails />;
  if (activeTab === "editProfile") return <ProfileEditor />;
  return <ProfileSettings />;
}

export default ProfileContent;
