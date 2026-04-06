import React, { useEffect, useState } from "react";
import { Save, Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-toastify";
import { updateUser } from "../../services/userService";
import { setUser } from "../../Redux/Slices/authSlics";
import { setProfile } from "../../Redux/Slices/profileSlice";
import { useProfileContext } from "./profileContext";
import {  validatePhone, validateEmail } from "../../Validators/phoneVal";

function ProfileEditor() {
  const {
    user,
    currentProfile,
    setActiveTab,
    isSubmitting,
    setIsSubmitting,
    dispatch,
  } = useProfileContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    postalCode: "",
    country: "",
    avatar: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: currentProfile?.name || "",
      email: currentProfile?.email || "",
      phone: (currentProfile?.phone) || "",
      city: currentProfile?.address?.[0]?.city || "",
      postalCode: currentProfile?.address?.[0]?.postalCode || "",
      country: currentProfile?.address?.[0]?.country || "",
      avatar: null,
    }));
  }, [
    currentProfile?.name,
    currentProfile?.email,
    currentProfile?.phone,
    currentProfile?.address,
  ]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onAvatarChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const removeSelectedAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: null }));
    // Reset the file input
    const fileInput = document.querySelector('input[name="avatar"]');
    if (fileInput) fileInput.value = '';
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!user?._id) return;

    if (!validateEmail(formData?.email)) {
      toast.error("Invalid email format.");
      return
    }
    if (formData.phone && !validatePhone(formData?.phone)) {
      toast.error("Invalid phone number format.");
      return
    }



    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);

    if (formData.password.trim()) payload.append("password", formData.password);

    const hasAddressValue =
      formData.city.trim() || formData.country.trim() || formData.postalCode.trim();
    if (hasAddressValue) {
      const addressPayload =
      {
        city: formData.city.trim(),
        country: formData.country.trim(),
        ...(formData.postalCode.trim()
          ? { postalCode: Number(formData.postalCode.trim()) }
          : {}),
      }
      payload.append("address", JSON.stringify(addressPayload));
    }

    if (formData.avatar) {
      payload.append("avatar", formData.avatar);
    }

    try {
      setIsSubmitting(true);
      const res = await updateUser(user._id, payload);
      const updatedUser = res?.updatedUser;
      if (updatedUser) {
        dispatch(setProfile(updatedUser));
        dispatch(setUser(updatedUser));
      }
      setFormData((prev) => ({ ...prev, password: "", avatar: null }));
      toast.success("Profile updated successfully");
      setActiveTab("profileDetails");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Enter your phone"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Password (optional)</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20 pr-12"
            placeholder="Leave empty to keep current password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={onInputChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={onInputChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Enter postal code"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Country</label>
        <input
          name="country"
          value={formData.country}
          onChange={onInputChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Enter your country"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
        <div className="space-y-3">
          {/* Current/Selected Avatar Display */}
          {(formData.avatar && currentProfile?.avatar) && (
            <div className="relative inline-block">
              <img
                src={formData.avatar ? URL.createObjectURL(formData.avatar) : currentProfile.avatar}
                alt="Profile preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              {formData.avatar && (
                <button
                  type="button"
                  onClick={removeSelectedAvatar}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  title="Remove selected image"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* File Input */}
          <input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
          />
          <p className="text-xs text-gray-500">
            {formData.avatar ? `Selected: ${formData.avatar.name}` : "Upload a new profile picture (optional)"}
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-md bg-[rgb(219,68,68)] text-white px-4 py-2 hover:bg-black transition disabled:opacity-60"
      >
        <Save size={18} />
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default ProfileEditor;