import jwt from "jsonwebtoken";

async function checkForgetPassToken(req, res, next) {
    const token = req.cookies["forget-password-token"];

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

async function checkForgetPassTokenNew(req, res, next) {
    const token = req.cookies["forget-password-token-new"];

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
            req.forgetPassUserNew = user;
            next();
        }
    );
}


export { checkForgetPassToken, checkForgetPassTokenNew };