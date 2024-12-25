// src/types/index.d.ts

export interface Book {
  book_id: number; // Unique identifier for the book
  title: string; // Title of the book
  author: string; // Author of the book
  description: string; // Description of the book
  availability: boolean; // Whether the book is available for rental
  quantity: number; // Number of available copies
  isbn: number;
  pagecount: number;
  published_date: string;
  genre: string;
  publisher: string;
  language: string;
  created_at?: string; // Date when the book was created
  updated_at?: string; // Date when the book was last updated
  rentedCount?: number; // Make this optional
}

export interface User {
  user_id: number; // Unique identifier for the user
  first_name: string; // User's first name
  last_name: string; // User's last name
  email: string; // User's email address
  password?: string; // User's password (can be NULL)
  role: "librarian" | "member"; // User's role in the system
  status: boolean; // User's account status
  created_at?: string; // Date when the user was created
  updated_at?: string; // Date when the user was last updated
}

export interface Rental {
  rental_id: number; // Unique identifier for the rental
  user_id: number; // ID of the user renting the book
  book_id: number; // ID of the book being rented
  rental_date: string; // Date of rental
  return_date: string; // Date of book return
  status: "active" | "returned"; // Rental status
  archived: boolean;
}
