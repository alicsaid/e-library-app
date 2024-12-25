// routes/auth.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../utils/auth");
const loginRateLimiter = require("../utils/rateLimiter");

// POST login
router.post("/login", loginRateLimiter, authController.login);

// POST forgot password
router.post("/forgot-password", authController.forgotPassword);

// POST reset password
router.post("/reset-password", authController.resetPassword);

// POST refresh token
router.post("/refresh-token", authController.refreshToken);

// POST change password
router.post("/change-password", auth, authController.changePassword);

module.exports = router;
