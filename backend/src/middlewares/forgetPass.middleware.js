import jwt from "jsonwebtoken";

export function generateForgetPasswordToken(email) {
    const payload = {
        email: email,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
}

const varifyForgetPasswordToken = () => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in varifyForgetPasswordToken:", error);
        res.status(500).json({ message: "Internal server error during token verification" });
    }
}

export { generateForgetPasswordToken, varifyForgetPasswordToken };