import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, forgetPassword } from "../services/authService";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import './VerifyOtpPage.css';

function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            toast.error("Session expired. Please try again.");
            navigate('/forget-password');
        }
    }, [email, navigate]);

    // Handle timer for resend OTP
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Auto-focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Only allow numbers
        const lastChar = value.substring(value.length - 1);
        if (lastChar && isNaN(lastChar)) return;

        const newOtp = [...otp];
        newOtp[index] = lastChar;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (lastChar && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // Focus previous and clear it
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            } else {
                // Just clear current
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').trim().slice(0, 6);
        if (!/^\d+$/.test(data)) return;

        const newOtp = [...otp];
        data.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        // Focus the last filled input or the first one after the paste
        const focusIndex = Math.min(data.length, 5);
        inputRefs.current[focusIndex].focus();
    };

    const handleResend = async () => {
        if (!canResend || !location.state?.email) return;

        setResendLoading(true);
        try {
            const response = await forgetPassword(location.state.email);
            toast.success(response.message || "OTP resent successfully!");
            setTimer(30);
            setCanResend(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP.");
        } finally {
            setResendLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length < 6) {
            toast.error("Please enter the complete 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const response = await verifyOtp(otpString);
            toast.success(response.message || "OTP verified successfully!");
            // Successfully verified, proceed to reset password
            navigate("/reset-password", { state: { email } });
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!email) return null;

    return (
        <div className="otp-container">
            <motion.div
                className="otp-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="otp-header">
                    <h2>Verify OTP</h2>
                    <p>
                        We've sent a security code to <br />
                        <span className="email-highlight">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="otp-input-group">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                onFocus={(e) => e.target.select()}
                                className="otp-box"
                                placeholder="•"
                                required
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="verify-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <SyncLoader color="#fff" size={8} margin={2} />
                        ) : (
                            "Verify & Proceed"
                        )}
                    </button>
                </form>

                <div className="resend-section">
                    <p>Didn't receive the code?</p>
                    <button
                        onClick={handleResend}
                        disabled={!canResend || resendLoading}
                        className={`resend-btn ${canResend ? 'active' : ''}`}
                    >
                        {resendLoading ? (
                            "Resending..."
                        ) : canResend ? (
                            "Resend OTP"
                        ) : (
                            `Resend in ${timer}s`
                        )}
                    </button>
                </div>

                <div className="back-link">
                    <Link to="/forget-password">
                        ← Try a different email
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default VerifyOtp;
