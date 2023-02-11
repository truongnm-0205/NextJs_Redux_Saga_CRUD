const User = require('../models/user');
const sendToken = require('../utils/jwtToken');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const crypto = require('crypto');
const APIFeatures = require('../utils/apiFeatures');



exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;


    const user = await User.create({
        name,
        email,
        password
    })



    sendToken(user, 200, res)

})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({
            success: false,
            message:'Please enter email & password'
        })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        res.status(401).json({
            success: false,
            message:'Invalid Email or Password'
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message:'Invalid Email or Password'
        })
    }

    sendToken(user, 200, res)
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('tokenn', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})


exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    
    res.status(200).json({
        success: true,
        user:req.user
    })
})

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 3
    const usersCount = await User.countDocuments({});
    
    const apiFeatures = new APIFeatures(User.find({}), req.query)
        .search()
        .filter()

    let users = await apiFeatures.query.clone();
    let filteredUsersCount = users.length;
    apiFeatures.pagination(resPerPage)
    users = await apiFeatures.query;

    res.status(200).json({
        success: true,
        filteredUsersCount,
        resPerPage,
        usersCount,
        users
    })
})



// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(401).json({
            success: false,
            message:`User does not found with id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message:`User does not found with id: ${req.params.id}`
        })
    }

    await user.remove();

    res.status(200).json({
        success: true,
    })
})

exports.addUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password,role } = req.body;


    const user = await User.create({
        name,
        email,
        password,
        role
    })


    res.status(200).json({
        success: true,
        user
    })

})

