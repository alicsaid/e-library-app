import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  DatePicker,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../../services/api";
import { Book } from "../../types";
import Navbar from "../../components/Navbar";
import moment from "moment";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Option } = Select;

const BookForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<Record<string, string | undefined>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [originalValues, setOriginalValues] = useState<Partial<Book>>({});
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchBook(Number(id));
    }
  }, [id]);

  const fetchBook = async (bookId: number) => {
    setLoading(true);
    try {
      const book = await getBookById(bookId);
      form.setFieldsValue({
        title: book.title,
        author: book.author,
        description: book.description,
        quantity: book.quantity,
        isbn: book.isbn,
        published_date: moment(book.published_date),
        pagecount: book.pagecount,
        genre: book.genre,
        publisher: book.publisher,
        language: book.language,
      });
      // Save original values to compare later
      setOriginalValues(book);
    } catch (error) {
      message.error("Error fetching book");
    }
    setLoading(false);
  };

  const handleChange = () => {
    const changedValues = form.getFieldsValue();

    if (!id) {
      // For new books, enable the button if required fields are filled
      const requiredFieldsFilled = [
        "title",
        "author",
        "isbn",
        "published_date",
        "pagecount",
        "genre",
        "publisher",
        "language",
        "quantity",
        "description",
      ].every((key) => !!changedValues[key]);

      setIsChanged(requiredFieldsFilled);
    } else {
      // For existing books, check if values have changed compared to originalValues
      const isEqual = Object.keys(originalValues).every((key) => {
        return (
          originalValues[key as keyof Book] === changedValues[key as keyof Book]
        );
      });
      setIsChanged(!isEqual);
    }
  };

  const onFinish = async (
    values: Omit<Book, "book_id" | "created_at" | "updated_at">
  ) => {
    setLoading(true);
    try {
      if (id) {
        // Update book
        await updateBook(Number(id), values);
        toast.success("Book updated successfully!");
      } else {
        // Create new book
        await createBook(values);
        toast.success("New book created successfully!");
      }
      navigate("/books");
    } catch (error) {
      toast.error("Error saving book");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          {id ? "Edit Book" : "Add a new Book"}
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            availability: true,
            quantity: 0,
          }}
          className="w-full max-w-2xl"
          onValuesChange={handleChange}
        >
          {/* Title and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="Enter book title" />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[{ required: true, message: "Please input the author!" }]}
            >
              <Input placeholder="Enter author name" />
            </Form.Item>
          </div>

          {/* ISBN and Published Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="ISBN"
              name="isbn"
              rules={[
                { required: true, message: "Please input the ISBN!" },
                { len: 13, message: "ISBN must be 13 characters long!" },
              ]}
            >
              <Input placeholder="Enter ISBN number" />
            </Form.Item>

            <Form.Item
              label="Published Date"
              name="published_date"
              rules={[
                {
                  required: true,
                  message: "Please select the published date!",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          {/* Genre and Publisher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: "Please select the genre!" }]}
            >
              <Select placeholder="Select genre">
                <Option value="Fiction">Fiction</Option>
                <Option value="Non-fiction">Non-fiction</Option>
                <Option value="Fantasy">Fantasy</Option>
                <Option value="Science-fiction">Science Fiction</Option>
                <Option value="Mystery">Mystery</Option>
                <Option value="Crime">Crime</Option>
                <Option value="Thriller">Thriller</Option>
                <Option value="Horror">Horror</Option>
                <Option value="Romance">Romance</Option>
                <Option value="Historical">Historical</Option>
                <Option value="Biography">Biography</Option>
                <Option value="Self-help">Self-Help</Option>
                <Option value="Children">Children</Option>
                <Option value="Young-adult">Young Adult</Option>
                <Option value="Poetry">Poetry</Option>
                <Option value="Classics">Classics</Option>
                <Option value="Graphic-novels">Graphic Novels</Option>
                <Option value="Cookbooks">Cookbooks</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Publisher"
              name="publisher"
              rules={[
                { required: true, message: "Please input the publisher!" },
              ]}
            >
              <Input placeholder="Enter publisher name" />
            </Form.Item>
          </div>

          {/* Language and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Language"
              name="language"
              rules={[
                { required: true, message: "Please select the language!" },
              ]}
            >
              <Select placeholder="Select language">
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="french">French</Option>
                <Option value="german">German</Option>
                <Option value="italian">Italian</Option>
                <Option value="bosnian">Bosnian</Option>
                <Option value="croatian">Croatian</Option>
                <Option value="serbian">Serbian</Option>
                <Option value="turkish">Turkish</Option>
                <Option value="arabic">Arabic</Option>
                <Option value="chinese">Chinese</Option>
                <Option value="japanese">Japanese</Option>
                <Option value="korean">Korean</Option>
                <Option value="russian">Russian</Option>
                <Option value="portuguese">Portuguese</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input the quantity!" },
                {
                  type: "number",
                  min: 1,
                  message: "Quantity must be at least 1!",
                },
              ]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Form.Item
              label="Page Count"
              name="pagecount"
              rules={[
                { required: true, message: "Please input the page count!" },
                {
                  type: "number",
                  min: 1,
                  message: "Page count must be at least 1!",
                },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="Enter page count"
              />
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                max: 300,
                message: "Description can be at most 300 characters!",
              },
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <TextArea placeholder="Enter book description" rows={4} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              disabled={!isChanged} // Disable the button if nothing has changed
            >
              {id ? "Update" : "Add"} Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default BookForm;
