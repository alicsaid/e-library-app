var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
require("dotenv").config();
var cors = require("cors");
var auth = require("./utils/auth");
const helmet = require("helmet");
const sequelize = require("./utils/dbConfig");

// Middleware setup
const app = express();

app.use(morgan("combined")); // "combined" log format za morgan

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Routes
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");
var rentalsRouter = require("./routes/rentals");

app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", auth, usersRouter);
app.use("/api/books", auth, booksRouter);
app.use("/api/rentals", auth, rentalsRouter);

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database tables:", error);
  });

module.exports = app;
