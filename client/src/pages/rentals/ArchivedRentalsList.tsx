import React, { useEffect, useState } from "react";
import { getArchivedRentals, getBooks, getUsers } from "../../services/api";
import { Rental, Book, User } from "../../types";
import Navbar from "../../components/Navbar";
import { Table, message, Spin, Button, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";

const ArchivedRentalsList: React.FC = () => {
  const [archivedRentals, setArchivedRentals] = useState<Rental[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [searchBook, setSearchBook] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [rentals, booksData, usersData] = await Promise.all([
          getArchivedRentals(),
          getBooks(),
          getUsers(),
        ]);
        setArchivedRentals(rentals);
        setBooks(booksData);
        setUsers(usersData);
      } catch (error) {
        message.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const getUserFullName = (userId: number) => {
    const user = users.find((u) => u.user_id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  const getBookTitle = (bookId: number) => {
    const book = books.find((b) => b.book_id === bookId);
    return book ? book.title : "Unknown Book";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not Available";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "orange";
      case "returned":
        return "green";
      default:
        return "grey";
    }
  };

  const columns: ColumnsType<Rental> = [
    {
      title: "Book",
      render: (text: any, rental: Rental) => getBookTitle(rental.book_id),
      sorter: (a, b) =>
        getBookTitle(a.book_id).localeCompare(getBookTitle(b.book_id)),
    },
    {
      title: "User",
      render: (text: any, rental: Rental) => getUserFullName(rental.user_id),
      sorter: (a, b) =>
        getUserFullName(a.user_id).localeCompare(getUserFullName(b.user_id)),
    },
    {
      title: "Rental Date",
      dataIndex: "rental_date",
      render: formatDate,
      sorter: (a, b) =>
        new Date(a.rental_date).getTime() - new Date(b.rental_date).getTime(),
    },
    {
      title: "Return Date",
      dataIndex: "return_date",
      render: formatDate,
      sorter: (a, b) =>
        new Date(a.return_date).getTime() - new Date(b.return_date).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span style={{ color: getStatusColor(status) }}>{status}</span>
      ),
    },
  ];

  // Filtriranje podataka prema korisniku i knjizi
  const filteredData = archivedRentals.filter((rental) => {
    const userName = getUserFullName(rental.user_id).toLowerCase();
    const bookTitle = getBookTitle(rental.book_id).toLowerCase();
    return (
      userName.includes(searchUser.toLowerCase()) &&
      bookTitle.includes(searchBook.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Archived Rentals</h2>
          <Link to="/rentals">
            <Button type="default">Back to Rentals</Button>
          </Link>
        </div>

        <div className="flex mb-4">
          <Input
            placeholder="Search by Username"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            style={{ marginRight: 8, width: 200 }}
          />
          <Input
            placeholder="Search by Book Title"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            style={{ marginRight: 8, width: 200 }}
          />
        </div>

        <Table columns={columns} dataSource={filteredData} rowKey="rental_id" />
      </div>
    </div>
  );
};

export default ArchivedRentalsList;
