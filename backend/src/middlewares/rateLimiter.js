import rateLimit from "express-rate-limit"

//////////////////////////////
// 🌍 GLOBAL LIMITER
//////////////////////////////
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

//////////////////////////////
// 🔐 LOGIN LIMITER
//////////////////////////////
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10,

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many login attempts. Try again after 15 minutes.",
        })
    },
})

//////////////////////////////
// 📩 OTP LIMITER
//////////////////////////////
export const otpLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 3,

    // per email + fallback IP
    keyGenerator: (req) => req.body.email || req.ip,

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many OTP requests. Please wait 1 minute before trying again.",
        })
    },
})