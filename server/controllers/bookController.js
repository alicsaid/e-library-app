// controllers/bookController.js

const Book = require("../models/Book");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    //console.log("DATA", books);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      quantity,
      isbn,
      published_date,
      pagecount,
      genre,
      publisher,
      language,
    } = req.body;
    const newBook = await Book.create({
      title,
      author,
      description,
      quantity,
      isbn,
      published_date,
      pagecount,
      genre,
      publisher,
      language,
    });
    res.status(201).json(newBook); // Send the created book as JSON
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      const {
        title,
        author,
        description,
        quantity,
        isbn,
        published_date,
        genre,
        publisher,
        language,
      } = req.body;
      await book.update({
        title,
        author,
        description,
        quantity,
        isbn,
        published_date,
        genre,
        publisher,
        language,
      });
      res.json(book); // Send the updated book as JSON
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
