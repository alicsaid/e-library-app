import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  message,
  AutoComplete,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { createRental, getUsers, getBooks } from "../../services/api";
import { Rental, User, Book } from "../../types";
import moment, { Moment } from "moment";
import Navbar from "../../components/Navbar";

const RentalForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [userSearch, setUserSearch] = useState<string>("");
  const [bookSearch, setBookSearch] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const fetchUsers = async (search: string) => {
    setUserSearch(search);
    try {
      const response = await getUsers();
      const filteredUsers = response.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      message.error("Error fetching users");
    }
  };

  const fetchBooks = async (search: string) => {
    setBookSearch(search);
    try {
      const response = await getBooks();
      const filteredBooks = response.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setBooks(filteredBooks);
    } catch (error) {
      message.error("Error fetching books");
    }
  };

  const onFinish = async (
    values: Omit<Rental, "rental_id"> & {
      rental_date: Moment;
      return_date?: Moment;
    }
  ) => {
    setLoading(true);
    try {
      const formattedValues: Omit<Rental, "rental_id"> = {
        user_id: selectedUserId as number,
        book_id: selectedBookId as number,
        rental_date: values.rental_date.toISOString(),
        return_date: values.return_date?.toISOString(),
        status: values.status,
        archived: false,
      };

      await createRental(formattedValues);
      message.success("Rental created successfully");

      navigate("/rentals");
    } catch (error) {
      message.error("Error saving rental");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Add a New Rental
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            rental_date: moment(),
            return_date: null,
            status: "active", // Set default status
          }}
          className="w-full max-w-md"
        >
          <Form.Item
            label={
              <span className="asterisk">
                <span>*</span> User
              </span>
            }
            rules={[{ required: true, message: "Please select a user!" }]}
          >
            <AutoComplete
              options={users.map((user) => ({
                value: `${user.first_name} ${user.last_name}`,
              }))}
              onSearch={fetchUsers}
              onChange={setUserSearch}
              onSelect={(value) => {
                const user = users.find(
                  (u) => `${u.first_name} ${u.last_name}` === value
                );
                setSelectedUserId(user?.user_id || null);
                form.setFieldValue("user_id", value);
              }}
              value={form.getFieldValue("user_id")}
              placeholder="Search for a user"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="asterisk">
                <span>*</span> Book
              </span>
            }
            rules={[{ required: true, message: "Please select a book!" }]}
          >
            <AutoComplete
              options={books.map((book) => ({
                value: book.title,
              }))}
              onSearch={fetchBooks}
              onChange={setBookSearch}
              onSelect={(value) => {
                const book = books.find((b) => b.title === value);
                setSelectedBookId(book?.book_id || null);
                form.setFieldValue("book_id", value);
              }}
              value={form.getFieldValue("book_id")}
              placeholder="Search for a book"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Rental Date"
            name="rental_date"
            rules={[
              { required: true, message: "Please select the rental date!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Return Date"
            name="return_date"
            rules={[
              { required: true, message: "Please select the return date!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          {/* Status Dropdown */}
          <Form.Item
            label="Status"
            name="status"
            rules={[
              { required: true, message: "Please select the rental status!" },
            ]}
          >
            <Select placeholder="Select status" className="w-full">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="returned">Returned</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Add Rental
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default RentalForm;
