// controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Validate input data
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({
        error: "First name, last name, email, and role are required.",
      });
    }

    if (role === "librarian" && !password) {
      return res
        .status(400)
        .json({ error: "Password is required for librarians." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    let hashedPassword = null;

    // Hash password for librarians
    if (role === "librarian") {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Create the new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword, // Store hashed password
      role,
    });

    // Exclude sensitive data (like password) from the response
    const { password: _, ...userWithoutPassword } = newUser.get({
      plain: true,
    });

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: error.errors.map((err) => err.message) });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const { first_name, last_name, email, password } = req.body;

      // Pripremite podatke za ažuriranje
      const updatedData = {
        first_name,
        last_name,
        email,
      };

      // Ako je lozinka prosleđena, dodajte je u podatke za ažuriranje
      if (password) {
        updatedData.password = password; // Čuvanje plain text lozinke
      }

      await user.update(updatedData);
      res.json(user.get({ plain: true })); // Pošaljite ažuriranog korisnika kao JSON
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
