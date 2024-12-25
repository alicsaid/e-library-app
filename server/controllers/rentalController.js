// controllers/rentalController.js

const Rental = require("../models/Rental");

// Get all rentals
exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      where: { archived: false },
    });
    //console.log("DATA:", rentals);
    res.json(rentals);
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single rental by ID
exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (rental) {
      res.json(rental);
    } else {
      res.status(404).json({ error: "Rental not found" });
    }
  } catch (error) {
    console.error("Error fetching rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new rental
exports.createRental = async (req, res) => {
  try {
    const { user_id, book_id, rental_date, return_date } = req.body;
    const rental = await Rental.create({
      user_id,
      book_id,
      rental_date,
      return_date,
    });
    res.status(201).json(rental); // Send the created rental as JSON
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing rental
exports.updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (rental) {
      const { user_id, book_id, return_date } = req.body;
      await rental.update({
        user_id,
        book_id,
        return_date,
      });
      res.json(rental); // Send the updated rental as JSON
    } else {
      res.status(404).json({ error: "Rental not found" });
    }
  } catch (error) {
    console.error("Error updating rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a rental
exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (rental) {
      await rental.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "Rental not found" });
    }
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all archived rentals
exports.getArchivedRentals = async (req, res) => {
  try {
    const archivedRentals = await Rental.findAll({
      where: { archived: true }, // Filter rentals where the archived column is true
    });
    res.json(archivedRentals);
  } catch (error) {
    console.error("Error fetching archived rentals:", error);
    res.status(500).send("Error fetching archived rentals");
  }
};

// Archive a single rental by ID and change status to 'returned'
exports.archiveRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);

    if (rental) {
      rental.archived = true;
      rental.status = "returned";
      await rental.save();

      res.json({
        message:
          "Rental archived and status changed to 'returned' successfully",
        rental,
      });
    } else {
      res.status(404).json({ error: "Rental not found" });
    }
  } catch (error) {
    console.error("Error archiving rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
