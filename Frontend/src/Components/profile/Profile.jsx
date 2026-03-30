import React from "react";
import { ProfileProvider } from "./profileContext";
import ProfileDashboard from "./profileDashboard";

function Profile() {
  return (
    <ProfileProvider>
      <ProfileDashboard />
    </ProfileProvider>
  );
}

export default Profile;