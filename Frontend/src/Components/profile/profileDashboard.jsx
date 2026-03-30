import React from "react";
import ProfileTopbar from "./profileTopbar";
import ProfileSidebar from "./profileSidebar";
import ProfileContent from "./profileContent";

function ProfileDashboard() {
  return (
    <div className="w-full max-w-7xl min-h-[calc(100vh-90px)] px-3 sm:px-4 md:px-6 py-6">
      <ProfileTopbar />
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <ProfileSidebar />
        <section>
          <ProfileContent />
        </section>
      </div>
    </div>
  );
}

export default ProfileDashboard;
