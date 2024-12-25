import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rental } from "../../types";
import { getRentalById, getUserById, getBookById } from "../../services/api";
import Navbar from "../../components/Navbar";
import moment from "moment";
import { message, Button } from "antd";

const RentalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rental, setRental] = useState<Rental | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRental = async () => {
    setLoading(true);
    try {
      const fetchedRental = await getRentalById(Number(id));
      const fetchedUser = await getUserById(fetchedRental.user_id); // Fetch user info
      const fetchedBook = await getBookById(fetchedRental.book_id); // Fetch book info

      setRental(fetchedRental);
      setUser(fetchedUser);
      setBook(fetchedBook);
    } catch (error) {
      message.error("Error fetching rental details");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRental();
  }, [id]);

  if (loading || !rental || !user || !book) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6 text-center">
        <h2 className="text-3xl font-bold">Rental #{rental.rental_id}</h2>
        <p className="mt-2">
          <strong>User Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p className="mt-2">
          <strong>Book Title:</strong> {book.title}
        </p>
        <p className="mt-2">
          <strong>Rental Date:</strong>{" "}
          {moment(rental.rental_date).format("YYYY-MM-DD")}
        </p>
        <p className="mt-2">
          <strong>Return Date:</strong>{" "}
          {rental.return_date
            ? moment(rental.return_date).format("YYYY-MM-DD")
            : "Not Returned"}
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

export default RentalDetails;
