const Rental = require("../models/Rental");
const moment = require("moment");
const { Op } = require("sequelize");
const { fn } = require("sequelize");

// Get notification count
exports.getNotificationCount = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const rentalCount = await Rental.count({
      where: {
        archived: false,
        return_date: {
          [Op.lte]: fn("DATE", today),
        },
      },
    });
    res.json({
      message: "Notification count fetched successfully",
      count: rentalCount,
    });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get notification rentals
exports.getNotificationRentals = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const rentals = await Rental.findAll({
      where: {
        archived: false,
        return_date: {
          [Op.lte]: fn("DATE", today),
        },
      },
    });
    res.json({
      message: "Rentals fetched successfully",
      rentals: rentals,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
