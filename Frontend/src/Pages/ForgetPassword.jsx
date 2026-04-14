import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgetPassword } from "../services/authService.js"
import { toast } from "react-toastify"
import { SyncLoader } from "react-spinners"
import { validateEmail } from "../validators/phoneVal"
import './ForgetPassword.css';

function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        try {
            const response = await forgetPassword(email);
            toast.success(response.message)
            navigate("/verify-otp", { state: { email } })

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
            setEmail("")
        }
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-card">
                <div className="forget-password-header">
                    <h2>Forgot Password?</h2>
                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn ">
                        {
                            loading ? <SyncLoader color="#fff" size={10} speedMultiplier={0.7} /> : "Send Reset Link"
                        }
                    </button>
                </form>

                <div className="back-to-login">
                    <Link to="/login">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
