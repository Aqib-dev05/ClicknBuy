import jwt from "jsonwebtoken";

async function checkForgetPassToken(req, res, next) {
    const token = req.cookies["forget-pass-token"];

    if (!token) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "Token not found",
        });
    }

    jwt.verify(
        token,
        "forget-password-token-secret-key",
        (err, user) => {
            if (err) {
                return res.status(401).send("Forbidden: Invalid token.");
            }
            req.forgetPassUser = user;
            next();
        }
    );
}


export default checkForgetPassToken;