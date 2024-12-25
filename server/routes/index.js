const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

// GET home page.
router.get("/", async function (req, res, next) {
  await runHashingExample(); // Pozovi funkciju kada korisnik pristupi stranici
  res.render("index", { title: "Express" });
});

// GET notifications
router.get("/notifications-count", indexController.getNotificationCount);

router.get("/notifications", indexController.getNotificationRentals);

module.exports = router;
