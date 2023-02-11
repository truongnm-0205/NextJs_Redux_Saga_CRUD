const User = require('../models/user')

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.verifyToken = catchAsyncErrors(async (req, res, next) => {

    const token = req.header('Authorization')

    if (!token) {
        return  res.status(401).json({success:false,message:'Login first to access this resource.'}) 

        
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return  res.status(401).json({success:false,message:`Role (${req.user.role}) is not allowed to acccess this resource`})  
        }
        next()
    }
}