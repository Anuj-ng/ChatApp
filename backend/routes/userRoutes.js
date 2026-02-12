const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/",isAuthenticated, userController.getOtherUsers);
//
// router.route('/register').post(registerUser); another way to write the above code
module.exports = router;
