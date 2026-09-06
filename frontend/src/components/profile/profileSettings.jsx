import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";
import { logout } from "../../Redux/Slices/authSlics";
import { setProfile } from "../../Redux/Slices/profileSlice";
import { useProfileContext } from "./profileContext";

function ProfileSettings() {
  const { user, isSubmitting, setIsSubmitting, dispatch, navigate } = useProfileContext();

  const onDeleteAccount = async () => {
    if (!user?._id) return;
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!isConfirmed) return;

    try {
      setIsSubmitting(true);
      await deleteUser(user._id);
      dispatch(logout());
      dispatch(setProfile(null));
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to delete account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Settings</h2>
      <p className="text-gray-600 mb-6">Manage your account actions from here.</p>
      <button
        onClick={onDeleteAccount}
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-xl bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition disabled:opacity-60"
      >
        <Trash2 size={18} />
        {isSubmitting ? "Processing..." : "Delete Account"}
      </button>
    </div>
  );
}

export default ProfileSettings;
