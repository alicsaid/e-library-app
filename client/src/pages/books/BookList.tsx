import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Select,
  Checkbox,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Book, Rental } from "../../types";
import { getBooks, getRentals, deleteBook } from "../../services/api";
import Navbar from "../../components/Navbar";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import {
  ViewButton,
  EditButton,
  DeleteButton,
  AddNewButton,
} from "../../components/common/Buttons";

const { Search } = Input;
const { Option } = Select;

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterAuthor, setFilterAuthor] = useState<string | null>(null);
  const [filterAvailable, setFilterAvailable] = useState<boolean>(false);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const booksData = await getBooks();
      const rentalsData: Rental[] = await getRentals();

      const rentedBooksCount = rentalsData.reduce((acc, rental) => {
        if (rental.status === "active") {
          acc[rental.book_id] = (acc[rental.book_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<number, number>);

      const updatedBooks = booksData.map((book) => {
        const rentedCount = rentedBooksCount[book.book_id] || 0;
        const availableCount = book.quantity - rentedCount;

        return {
          ...book,
          rentedCount,
          available: availableCount,
        };
      });

      const sortedBooks = updatedBooks.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

      setBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
    } catch (error) {
      toast.error("Error fetching books"); // Replace message.error with toast.error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [sortOrder]);

  const handleSearch = (value: string) => {
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
    );

    if (filterAuthor) {
      filtered = filtered.filter((book) => book.author === filterAuthor);
    }

    if (filterGenre) {
      filtered = filtered.filter((book) => book.genre === filterGenre);
    }

    if (filterAvailable) {
      filtered = filtered.filter((book) => {
        const availableCount = book.quantity - (book.rentedCount || 0);
        return availableCount > 0;
      });
    }

    setFilteredBooks(filtered);
  };

  useEffect(() => {
    let filtered = books;

    if (filterAuthor) {
      filtered = filtered.filter((book) => book.author === filterAuthor);
    }

    if (filterGenre) {
      filtered = filtered.filter((book) => book.genre === filterGenre);
    }

    if (filterAvailable) {
      filtered = filtered.filter((book) => {
        const availableCount = book.quantity - (book.rentedCount || 0);
        return availableCount > 0;
      });
    }

    setFilteredBooks(filtered);
  }, [books, filterAuthor, filterAvailable, filterGenre]);

  const handleAuthorChange = (value: string | null) => {
    setFilterAuthor(value);
  };

  const handleAvailabilityChange = (e: any) => {
    setFilterAvailable(e.target.checked);
    handleSearch(""); // Reset search when changing availability filter
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully"); // Replace message.success with toast.success
      fetchBooks();
    } catch (error) {
      toast.error("Error deleting book"); // Replace message.error with toast.error
    }
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Book, b: Book) => a.title.localeCompare(b.title),
      render: (text: string, record: Book) => (
        <Link to={`/books/${record.book_id}`}>{text}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sorter: (a: Book, b: Book) => a.author.localeCompare(b.author),
    },
    {
      title: "Published Date",
      dataIndex: "published_date",
      key: "published_date",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Availability",
      key: "availability",
      render: (_: any, record: Book) => {
        const availableCount = record.quantity - (record.rentedCount || 0);
        return (
          <span>
            {availableCount} Available ({record.quantity} total)
          </span>
        );
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Book) => (
        <Space size="middle">
          <ViewButton entityId={record.book_id} basePath="books" />
          <EditButton entityId={record.book_id} basePath="books" />
          <DeleteButton entityId={record.book_id} onDelete={handleDelete} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Books</h2>

          <div className="flex space-x-4">
            <Search
              placeholder="Search by title or author"
              onSearch={handleSearch}
              enterButton
            />
            <AddNewButton basePath="books" label="Add New Book" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Select
              placeholder="Filter by author"
              style={{ width: 200 }}
              onChange={handleAuthorChange}
              allowClear
              value={filterAuthor}
            >
              {Array.from(new Set(books.map((book) => book.author))).map(
                (author) => (
                  <Option key={author} value={author}>
                    {author}
                  </Option>
                )
              )}
            </Select>
            <Select
              placeholder="Filter by genre"
              style={{ width: 200 }}
              onChange={setFilterGenre}
              allowClear
              value={filterGenre}
            >
              {Array.from(new Set(books.map((book) => book.genre))).map(
                (genre) => (
                  <Option key={genre} value={genre}>
                    {genre}
                  </Option>
                )
              )}
            </Select>

            <Checkbox
              checked={filterAvailable}
              onChange={handleAvailabilityChange}
            >
              Show only available books
            </Checkbox>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBooks}
          rowKey="book_id"
          loading={loading}
        />
      </div>

      {/* Add ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default BookList;
