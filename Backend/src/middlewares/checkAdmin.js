 const checkAdmin = (req,res,next)=>{
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({
            status: "Forbidden",
            message: "Admin access only.",
        });
    }
    next();

}

export default checkAdmin;
