import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Input,
  Select,
  Checkbox,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Rental, Book, User } from "../../types";
import {
  getRentals,
  deleteRental,
  getBooks,
  archiveRental,
  getUsers,
} from "../../services/api";
import Navbar from "../../components/Navbar";
import {
  ViewButton,
  EditButton,
  DeleteButton,
  ArchiveButton,
} from "../../components/common/Buttons";

const { Search } = Input;
const { Option } = Select;

const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [showFinished, setShowFinished] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const data = await getRentals();
      setRentals(data);
      setFilteredRentals(data);
    } catch (error) {
      message.error("Error loading rentals");
    }
    setLoading(false);
  };

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      message.error("Error loading books");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      message.error("Error loading users");
    }
  };

  useEffect(() => {
    fetchRentals();
    fetchBooks();
    fetchUsers();
  }, []);

  const applyFilters = () => {
    let filtered = rentals;

    if (searchTerm) {
      filtered = filtered.filter((rental) => {
        const user = users.find((user) => user.user_id === rental.user_id);
        const book = books.find((book) => book.book_id === rental.book_id);

        const userName = user
          ? `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`
          : "";
        const bookTitle = book ? book.title.toLowerCase() : "";

        const search = searchTerm.toLowerCase();
        return userName.includes(search) || bookTitle.includes(search);
      });
    }

    if (selectedBook) {
      filtered = filtered.filter(
        (rental) => rental.book_id.toString() === selectedBook
      );
    }

    if (showFinished) {
      filtered = filtered.filter((rental) => rental.return_date !== null);
    }

    if (selectedStatus) {
      filtered = filtered.filter((rental) => rental.status === selectedStatus);
    }

    setFilteredRentals(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleBookChange = (value: string) => {
    setSelectedBook(value);
  };

  const handleAvailabilityChange = (e: any) => {
    setShowFinished(e.target.checked);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedBook, showFinished, selectedStatus, rentals]);

  const handleDelete = async (id: number) => {
    try {
      await deleteRental(id);
      message.success("Rental successfully deleted");
      fetchRentals();
    } catch (error) {
      message.error("Error deleting rental");
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await archiveRental(id);
      message.success("Rental successfully archived");
      fetchRentals();
    } catch (error) {
      console.error("Archiving rental failed:", error);
      message.error("Error archiving rental");
    }
  };

  const columns = [
    {
      title: "User Name",
      key: "user_name",
      sorter: (a: Rental, b: Rental) => {
        const userA = users.find((user) => user.user_id === a.user_id);
        const userB = users.find((user) => user.user_id === b.user_id);
        const nameA = userA
          ? `${userA.first_name} ${userA.last_name}`
          : "Unknown User";
        const nameB = userB
          ? `${userB.first_name} ${userB.last_name}`
          : "Unknown User";
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: Rental) => {
        const user = users.find((user) => user.user_id === record.user_id);
        return user ? (
          <Link to={`/users/${user.user_id}`}>
            {user.first_name} {user.last_name}
          </Link>
        ) : (
          "Unknown User"
        );
      },
    },
    {
      title: "Book Title",
      key: "book_title",
      sorter: (a: Rental, b: Rental) => {
        const bookA = books.find((book) => book.book_id === a.book_id);
        const bookB = books.find((book) => book.book_id === b.book_id);
        const titleA = bookA ? bookA.title.toLowerCase() : "";
        const titleB = bookB ? bookB.title.toLowerCase() : "";
        return titleA.localeCompare(titleB);
      },
      render: (_: any, record: Rental) => {
        const book = books.find((book) => book.book_id === record.book_id);
        return book ? (
          <Link to={`/books/${book.book_id}`}>{book.title}</Link>
        ) : (
          "Unknown Book"
        );
      },
    },
    {
      title: "Rental Date",
      dataIndex: "rental_date",
      key: "rental_date",
      sorter: (a: Rental, b: Rental) =>
        new Date(a.rental_date).getTime() - new Date(b.rental_date).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Return Date",
      dataIndex: "return_date",
      key: "return_date",
      sorter: (a: Rental, b: Rental) => {
        const dateA = a.return_date ? new Date(a.return_date).getTime() : 0;
        const dateB = b.return_date ? new Date(b.return_date).getTime() : 0;
        return dateA - dateB;
      },
      render: (date?: string) =>
        date ? new Date(date).toLocaleDateString() : "Not Returned",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: Rental, b: Rental) => a.status.localeCompare(b.status),
      render: (status: string) => {
        if (status === "returned") {
          return <span style={{ color: "green" }}>Returned</span>;
        } else {
          return <span style={{ color: "orange" }}>Active</span>;
        }
      },
    },
    {
      title: "Due Date",
      key: "due_date",
      sorter: (a: Rental, b: Rental) => {
        const dueDateA = new Date(a.return_date).getTime();
        const dueDateB = new Date(b.return_date).getTime();
        return dueDateA - dueDateB;
      },
      render: (_: any, record: Rental) => {
        if (!record.return_date) {
          return <span>No return date set</span>;
        }

        const returnDate = new Date(record.return_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to ignore time part

        // Izračunaj broj preostalih dana do return_date
        const daysRemaining = Math.ceil(
          (returnDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        if (daysRemaining < 0) {
          return <span style={{ color: "red" }}>Due date has passed!</span>;
        }

        if (daysRemaining === 0) {
          return <span style={{ color: "blue" }}>Due date is today!</span>;
        }

        return <span>{daysRemaining} day(s) remaining</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Rental) => (
        <Space size="middle">
          <ViewButton entityId={record.rental_id} basePath="rentals" />
          <EditButton entityId={record.rental_id} basePath="rentals" />
          <DeleteButton
            entityId={record.rental_id}
            basePath="rentals"
            onDelete={() => handleDelete(record.rental_id)} // Placeholder function
          />
          <ArchiveButton
            entityId={record.rental_id}
            basePath="rentals"
            onArchive={() => handleArchive(record.rental_id)} // Placeholder function
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Rentals</h2>
          <div className="flex space-x-4">
            <Search
              placeholder="Search by user name or book title"
              onSearch={handleSearch}
              enterButton
            />
            <div className="flex space-x-4">
              <Button type="primary" onClick={() => navigate("/rentals/add")}>
                Add New Rental
              </Button>
              <Button
                type="default"
                onClick={() => navigate("/archived-rentals")}
              >
                Archived Rentals
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <Select
            placeholder="Filter by Book"
            style={{ width: 200, marginRight: 16 }}
            onChange={handleBookChange}
            allowClear
          >
            {books.map((book) => (
              <Option key={book.book_id} value={book.book_id.toString()}>
                {book.title}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Status"
            style={{ width: 200, marginRight: 16 }}
            onChange={handleStatusChange}
            allowClear
          >
            <Option value="active">Active</Option>
            <Option value="returned">Returned</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredRentals}
          loading={loading}
          rowKey="rental_id"
        />
      </div>
    </div>
  );
};

export default RentalList;
