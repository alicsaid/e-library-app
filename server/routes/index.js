const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

// GET home page.
router.get("/", async function (req, res, next) {
  //await runHashingExample();
  res.render("index", { title: "Express" });
});

// GET notifications count
router.get("/notifications-count", indexController.getNotificationCount);

// GET notifications
router.get("/notifications", indexController.getNotificationRentals);

module.exports = router;
