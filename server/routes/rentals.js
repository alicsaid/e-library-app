// routes/rentals.js

const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

// GET all rentals
router.get("/", rentalController.getAllRentals);

// GET archived rentals
router.get("/archived", rentalController.getArchivedRentals);

// GET a single rental by ID
router.get("/:id", rentalController.getRentalById);

// POST create a new rental
router.post("/", rentalController.createRental);

// PUT update an existing rental
router.put("/:id", rentalController.updateRental);

// DELETE a rental
router.delete("/:id", rentalController.deleteRental);

// Archive a rental by ID
router.patch("/:id/archive", rentalController.archiveRentalById);

module.exports = router;
