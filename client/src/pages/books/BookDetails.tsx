import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, getRentals } from "../../services/api";
import { Book, Rental } from "../../types";
import Navbar from "../../components/Navbar";
import moment from "moment";
import { message, Button } from "antd";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rentedCount, setRentedCount] = useState<number>(0);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const bookData = await getBookById(Number(id));
      const rentalsData: Rental[] = await getRentals();

      const rentedBooksCount = rentalsData.reduce((acc, rental) => {
        if (rental.status === "active" && rental.book_id === bookData.book_id) {
          acc += 1;
        }
        return acc;
      }, 0);

      setRentedCount(rentedBooksCount);
      setBook(bookData);
    } catch (error) {
      message.error("Error fetching book details");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center">Book not found</div>;
  }

  const availableCount = book.quantity - rentedCount;

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6 text-center">
        <h2 className="text-3xl font-bold">{book.title}</h2>
        <p className="mt-2">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="mt-2">
          <strong>Published Date:</strong>{" "}
          {moment(book.published_date).format("YYYY-MM-DD")}
        </p>
        <p className="mt-2">
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p className="mt-2">
          <strong>Availability:</strong> {availableCount} Available (
          {book.quantity} total)
        </p>
        <p className="mt-2">
          <strong>Book Description:</strong>
          <br />
          {book.description}
        </p>
        <p className="mt-2">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="mt-2">
          <strong>Language:</strong>{" "}
          {book.language.charAt(0).toUpperCase() + book.language.slice(1)}
        </p>
        <p className="mt-2">
          <strong>Page Count:</strong> {book.pagecount}
        </p>
        <div className="mt-6">
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
