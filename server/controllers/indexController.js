const Rental = require("../models/Rental");
const moment = require("moment");
const { Op } = require("sequelize");
const { fn, col } = require("sequelize");

exports.getNotificationCount = async (req, res) => {
  try {
    // Trenutni datum bez vremena
    const today = moment().format("YYYY-MM-DD"); // Trenutni datum u formatu 'YYYY-MM-DD'

    // Broj rentala koji nisu arhivirani i imaju return_date manji ili jednak današnjem datumu (bez vremena)
    const rentalCount = await Rental.count({
      where: {
        archived: false, // Rentali koji nisu arhivirani
        return_date: {
          [Op.lte]: fn("DATE", today), // Poredi samo datum bez vremena
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

exports.getNotificationRentals = async (req, res) => {
  try {
    // Trenutni datum bez vremena
    const today = moment().format("YYYY-MM-DD"); // Trenutni datum u formatu 'YYYY-MM-DD'

    // Dohvatanje svih rentala koji nisu arhivirani i imaju return_date manji ili jednak današnjem datumu (bez vremena)
    const rentals = await Rental.findAll({
      where: {
        archived: false, // Rentali koji nisu arhivirani
        return_date: {
          [Op.lte]: fn("DATE", today), // Poredi samo datum bez vremena
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
