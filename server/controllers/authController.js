const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize"); // Make sure to import Op for comparisons

// Helper function to generate access token (valid for 15 minutes)
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Helper function to generate refresh token (valid for 7 days)
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Helper function to generate JWT token for password reset (valid for 1 hour)
const generateResetPasswordToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Prijava korisnika
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Proveravamo da li korisnik postoji na osnovu email-a
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Proveravamo da li je uloga korisnika librarian
    if (user.role !== "librarian") {
      return res
        .status(403)
        .json({ error: "Access denied. Only librarians can log in." });
    }

    // Proveravamo da li je lozinka ispravna
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    // Generisanje JWT tokena za librarian-a
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Vraćanje odgovora sa tokenom i osnovnim informacijama
    res.json({
      token,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Endpoint for refreshing the access token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ error: "No refresh token provided." });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate a new access token
    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(403).json({ error: "Invalid refresh token." });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generišemo JWT token za reset lozinke
    const resetToken = generateResetPasswordToken(user.user_id);

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`; // Fixed string interpolation

    // Konfigurišemo nodemailer za slanje e-maila
    const transporter = nodemailer.createTransport({
      service: "gmail", // Ili neki drugi SMTP servis
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Kreiramo e-mail sa linkom za resetovanje lozinke
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
             <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Reset Password - Controller
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }, // Use Op.gt instead of $gt
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Change password functionality
exports.changePassword = async (req, res) => {
  const { password } = req.body;
  const { userId } = req;

  try {
    // Find the user based on the userId from the JWT token
    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error during password change:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
