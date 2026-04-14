import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { motion } from "framer-motion";
import './ResetPassword.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    // Redirect if no email in state (accessed directly)
    if (!email) {
        navigate('/forget-password');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword(newPassword);
            toast.success(response.message || "Password reset successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Session may have expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-container">
            <motion.div
                className="reset-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="reset-header">
                    <div className="icon-badge">
                        {/* <FaLock /> */}
                    </div>
                    <h2>Set New Password</h2>
                    <p>
                        Please create a secure password for <br />
                        <span className="email-highlight">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="input-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="reset-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <SyncLoader color="#fff" size={8} margin={2} />
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <div className="back-link">
                    <Link to="/login">
                        ← Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default ResetPassword;
