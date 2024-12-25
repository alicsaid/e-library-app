import React from "react";
import { Collapse, Card, Typography, Space } from "antd";
import {
  BookOutlined,
  UserOutlined,
  SolutionOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const Help: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 mt-6">
        <Title level={2} className="text-center">
          Help & Instructions for Librarians
        </Title>
        <Paragraph className="text-center">
          Welcome to the Help section! Below you'll find instructions on how to
          manage books, users, and rentals.
        </Paragraph>

        <Collapse defaultActiveKey={["1"]} accordion>
          {/* Book Management Section */}
          <Panel
            header={
              <span>
                <BookOutlined /> Book Management
              </span>
            }
            key="1"
          >
            <Card>
              <Title level={4}>Managing Books</Title>
              <Paragraph>
                As a librarian, you have several options to manage books in the
                system:
              </Paragraph>
              <ul>
                <li>
                  <strong>Search by Author and Title:</strong> You can search
                  for books using the title or author's name in the search bar.
                </li>
                <li>
                  <strong>Add New Book:</strong> Add new books to the library by
                  filling out necessary fields such as the title, author, genre,
                  and ISBN.
                </li>
                <li>
                  <strong>Filter by Author:</strong> Filter the books list to
                  show only books from a specific author.
                </li>
                <li>
                  <strong>Filter by Genre:</strong> Filter the books by genre to
                  narrow down the list based on categories such as Fiction,
                  Non-fiction, Mystery, etc.
                </li>
                <li>
                  <strong>Filter Only Available Books:</strong> You can filter
                  the list to show only the books that are currently available
                  for borrowing.
                </li>
                <li>
                  <strong>View, Edit, or Delete Books:</strong> You can view
                  detailed information about any book, edit its details, or
                  delete it if necessary.
                </li>
                <li>
                  <strong>Pagination Table:</strong> Books are displayed in a
                  paginated table, allowing you to easily navigate through large
                  amounts of books.
                </li>
              </ul>
            </Card>
          </Panel>

          {/* User Management Section */}
          <Panel
            header={
              <span>
                <UserOutlined /> User Management
              </span>
            }
            key="2"
          >
            <Card>
              <Title level={4}>Managing Users</Title>
              <Paragraph>
                As a librarian, you can manage user accounts, assign roles, and
                perform various actions on the users:
              </Paragraph>
              <ul>
                <li>
                  <strong>Search by User Name:</strong> You can search for users
                  by entering their username into the search bar.
                </li>
                <li>
                  <strong>Add New User:</strong> Add new users (both Members and
                  Librarians) by providing their required details.
                </li>
                <li>
                  <strong>Filter by Role:</strong> You can filter users based on
                  their role (either Member or Librarian).
                </li>
                <li>
                  <strong>View, Edit, or Delete Users:</strong> You have the
                  ability to view user profiles, make edits to their
                  information, or delete users from the system.
                </li>
                <li>
                  <strong>Manage Member and Librarian Roles:</strong> You can
                  create users as either Members or Librarians. Librarians will
                  require an additional password for their accounts.
                </li>
                <li>
                  <strong>Pagination Table:</strong> Users are listed in a
                  paginated table for easy browsing.
                </li>
              </ul>
            </Card>
          </Panel>

          {/* Rental Management Section */}
          <Panel
            header={
              <span>
                <SolutionOutlined /> Rental Management
              </span>
            }
            key="3"
          >
            <Card>
              <Title level={4}>Managing Rentals</Title>
              <Paragraph>
                Librarians manage rentals through these steps:
              </Paragraph>
              <ul>
                <li>
                  <strong>Important: Create User Before Adding Rental:</strong>{" "}
                  In order to add a rental, you must first create a user (either
                  a member or a librarian) for the rental to be associated with.
                  Once the user is added, you can proceed to add the rental.
                </li>
                <li>
                  <strong>Search by User Name or Title:</strong> You can search
                  for rentals either by the user’s name or by the title of the
                  book being rented.
                </li>
                <li>
                  <strong>Add New Rental:</strong> To add a new rental, first
                  ensure the user is created. Then, add a rental record for that
                  user.
                </li>
                <li>
                  <strong>Archived Rentals:</strong> You can view and manage
                  archived rentals, i.e., rentals that are completed or no
                  longer active.
                </li>
                <li>
                  <strong>Filter by Book:</strong> You can filter rentals to
                  show only those associated with a specific book.
                </li>
                <li>
                  <strong>Filter by Status:</strong> Filter rentals by their
                  current status (e.g., Active, Overdue, Returned).
                </li>
                <li>
                  <strong>View, Edit, Delete, or Archive Rentals:</strong> You
                  have the ability to view, modify, delete, or archive rental
                  records.
                </li>
                <li>
                  <strong>Pagination Table:</strong> Rentals are listed in a
                  paginated table, making it easy to navigate large rental
                  lists.
                </li>
              </ul>
            </Card>
          </Panel>

          {/* Searching and Filtering Section */}
          <Panel
            header={
              <span>
                <SearchOutlined /> Searching and Filtering
              </span>
            }
            key="4"
          >
            <Card>
              <Title level={4}>Search and Filter Data</Title>
              <Paragraph>
                Searching and filtering are essential for efficient management:
              </Paragraph>
              <ul>
                <li>
                  <strong>Search Functionality:</strong> You can search users,
                  books, and rentals using the search bar, which allows
                  searching by title, author, or user name.
                </li>
                <li>
                  <strong>Filtering Options:</strong> Filtering options allow
                  you to narrow down data by roles (for users), genres (for
                  books), or status (for rentals).
                </li>
                <li>
                  <strong>Filters are Persistent:</strong> After applying
                  filters, they remain active until manually cleared, so you can
                  always return to a filtered view.
                </li>
              </ul>
            </Card>
          </Panel>

          {/* FAQ Section */}
          <Panel
            header={
              <span>
                <InfoCircleOutlined /> Frequently Asked Questions
              </span>
            }
            key="5"
          >
            <Card>
              <Title level={4}>FAQs</Title>
              <ul>
                <li>
                  <strong>Q: How do I reset a user’s password?</strong>
                  <br />
                  A: To reset a password, go to the User Management section,
                  select the user, and choose the "Reset Password" option.
                </li>
                <li>
                  <strong>Q: How can I mark a book as damaged?</strong>
                  <br />
                  A: Mark the book as damaged in the Books section and add a
                  note explaining the issue.
                </li>
                <li>
                  <strong>Q: Can I extend a rental period?</strong>
                  <br />
                  A: Yes, you can extend a rental by updating the rental record
                  with a new due date.
                </li>
                <li>
                  <strong>
                    Q: What do I do if I cannot find a book in the library?
                  </strong>
                  <br />
                  A: If a book is missing, check the library’s archived rentals
                  or inventory records. You can mark the book as lost if
                  necessary.
                </li>
              </ul>
            </Card>
          </Panel>
        </Collapse>

        {/* Need More Help Section */}
        <div className="mt-6 text-center">
          <Title level={5}>Need More Help?</Title>
          <Paragraph>
            If you have any other questions, feel free to reach out to the
            support team or consult our online resources.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Help;
