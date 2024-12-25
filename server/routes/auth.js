// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../utils/auth"); // Correct the import if necessary
const loginRateLimiter = require("../utils/rateLimiter"); // Import rate limiter

// Ruta za prijavu
router.post("/login", loginRateLimiter, authController.login);

// Ruta za zahtev za resetovanje lozinke
router.post("/forgot-password", authController.forgotPassword);

// Ruta za resetovanje lozinke
router.post("/reset-password", authController.resetPassword);

// Ruta za osvežavanje tokena
router.post("/refresh-token", authController.refreshToken);

// Ruta za promenu lozinke (Protected route)
router.post("/change-password", auth, authController.changePassword); // Protect the route with JWT token

module.exports = router;
