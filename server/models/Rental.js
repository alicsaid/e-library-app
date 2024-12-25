// model/Rental.js

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConfig");
const Book = require("./Book"); // Import Book model

const Rental = sequelize.define(
  "Rental",
  {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Ime tabele
        key: "user_id",
      },
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Books", // Ime tabele
        key: "book_id",
      },
      allowNull: false,
    },
    rental_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      // Status iznajmljivanja (npr. "active", "returned")
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // Početni status
    },
    archived: {
      // Polje za arhiviranje iznajmljivanja
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "rentals",
  }
);

// Export the Rental model
module.exports = Rental;
