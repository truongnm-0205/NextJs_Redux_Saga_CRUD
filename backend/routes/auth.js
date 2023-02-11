const express = require('express');

const authController = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require('../middlewares/auth')
const {
    registerUser,
    loginUser,
    logout,
    getUserProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    addUser

} = require('../controllers/authController');



const router = express.Router();


router.post("/register",registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/me').get(verifyToken,getUserProfile)

router.route('/admin/users').get(verifyToken, allUsers);

router.route('/admin/user/new').post(verifyToken, authorizeRoles('admin'), addUser)

router.route('/admin/user/:id')
    .get(verifyToken, authorizeRoles('admin'), getUserDetails) 
    .put(verifyToken, authorizeRoles('admin'), updateUser)
    .delete(verifyToken, authorizeRoles('admin'), deleteUser)

module.exports = router;