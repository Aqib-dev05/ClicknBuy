import React, { useEffect, useState } from 'react'
import { updateUser } from "../../services/userService"
import { getMe } from "../../services/authService"
import { HashLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { motion as Motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Camera, Save, Key, Eye, EyeOff } from 'lucide-react';

function EditAdminProfile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: {
            city: "",
            country: "",
            postalCode: ""
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await getMe();
                const fetchedUser = res?.user;
                if (fetchedUser) {
                    setUser(fetchedUser);
                    setFormData({
                        name: fetchedUser.name || "",
                        email: fetchedUser.email || "",
                        phone: fetchedUser.phone || "",
                        password: "",
                        address: {
                            city: fetchedUser.address?.city || "",
                            country: fetchedUser.address?.country || "",
                            postalCode: fetchedUser.address?.postalCode || ""
                        }
                    });
                    setPreview(fetchedUser.avatar?.url || "");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("password", formData.password);
            data.append("address", JSON.stringify(formData.address));
            if (avatar) {
                data.append("avatar", avatar);
            }

            const res = await updateUser(user._id, data);
            if (res) {
                toast.success("Profile updated successfully!");
                // Update local state if needed (user being fetched again on re-mount or manually)
            }
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update profile";
            toast.error(message);
            console.error("Update error:", err);
        } finally {
            setBtnLoading(false);
        }
    };

    if (loading) return (
        <div className='flex justify-center items-center h-[70vh]'>
            <HashLoader color="#DB4444" size={50} />
        </div>
    );

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4 md:p-8"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header/Cover */}
                <div className="h-32 bg-gradient-to-r from-[rgb(219,68,68)] to-[rgb(190,50,50)] relative">
                    <div className="absolute -bottom-16 left-8 md:left-12">
                        <div className="relative group">
                            <img
                                src={preview || "/default-avatar.png"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <Camera className="text-white w-8 h-8" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-20 px-8 md:px-12 pb-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                        <p className="text-gray-500">Update your administrative account information.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16} className="text-[rgb(219,68,68)]" /> Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail size={16} className="text-[rgb(219,68,68)]" /> Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone size={16} className="text-[rgb(219,68,68)]" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="+92 300 0000000"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Key size={16} className="text-[rgb(219,68,68)]" /> Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all pr-12"
                                        placeholder="Enter your password"
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

                            {/* City */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-[rgb(219,68,68)]" /> City
                                </label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={formData.address.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="City"
                                />
                            </div>

                            {/* Country */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-[rgb(219,68,68)]" /> Country
                                </label>
                                <input
                                    type="text"
                                    name="address.country"
                                    value={formData.address.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="Country"
                                />
                            </div>

                            {/* Postal Code */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-[rgb(219,68,68)]" /> Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="address.postalCode"
                                    value={formData.address.postalCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[rgb(219,68,68)] focus:border-transparent outline-none transition-all"
                                    placeholder="Postal Code"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                disabled={btnLoading}
                                type="submit"
                                className="bg-[rgb(219,68,68)] hover:bg-[rgb(190,50,50)] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {btnLoading ? (
                                    <PulseLoader size={8} color="#fff" />
                                ) : (
                                    <>
                                        <Save size={18} /> Update Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Motion.div>
    );
}

export default EditAdminProfile;
