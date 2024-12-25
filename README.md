# eLibrary App

eLibrary is a web application designed for managing and renting books online. Users can explore the available collection of books, rent them, track their rented books, and leave ratings and reviews. Administrators have additional capabilities, such as adding new books, managing users, and monitoring rental statuses.

---

## Features

### User Features:

- Browse available books by categories or search.
- Rent books and view rental history.
- Track currently rented books.
- Rate and review books.

### Administrator Features:

- Add, update, or delete books.
- Manage user accounts.
- View and monitor book rental statuses.

---

## Project Structure

This project is organized into two main parts:

- **Server**: Backend built with Node.js, Express, and PostgreSQL.
- **Client**: Frontend built with React.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/) (optional, for version control)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-library-app
```

### 2. Backend (server) setup

```bash
cd server
npm install
npm run dev
```

The backend server will run on http://localhost:5000 by default.

### 3. Frontend (client) setup

```bash
cd client
npm install
npm start
```

The frontend server will run on http://localhost:3000 by default.

## Running the Application

To run the full application:

- Start the backend server (npm run dev in the server directory).
- Start the frontend server (npm start in the client directory).
- Open your browser and navigate to http://localhost:3000.

## License

This project is licensed under the MIT License.
