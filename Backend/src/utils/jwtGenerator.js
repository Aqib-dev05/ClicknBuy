import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secure-kro-account-ko";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function generateToken(user) {
  if (!user || !user._id) {
    throw new Error("Valid user with _id is required to generate token");
  }

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}