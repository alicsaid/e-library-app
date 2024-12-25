// models/Book.js

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConfig"); // Import the sequelize instance directly
const Rental = require("./Rental"); // Import Rental model

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    quantity: {
      // Track how many copies of each book
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(13),
      unique: true,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATE,
    },
    genre: {
      type: DataTypes.STRING(100),
    },
    publisher: {
      type: DataTypes.STRING(255),
    },
    language: {
      type: DataTypes.STRING(50),
    },
    pagecount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);

// Optionally, add hooks to update 'updated_at' on updates
Book.beforeUpdate((book) => {
  book.updated_at = new Date(); // Update updated_at field before an update
});

module.exports = Book;
