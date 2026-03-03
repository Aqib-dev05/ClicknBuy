import jwt from "jsonwebtoken";

async function checkAuth(req, res, next) {
  const token = req.cookies["access-token"];

  if (!token) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Token not found",
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secure-kro-account-ko",
    (err, user) => {
      if (err) {
        return res.status(401).send("Forbidden: Invalid token.");
      }
      req.user = user;
      next();
    }
  );
}
