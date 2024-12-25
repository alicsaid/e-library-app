import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/books/BookList";
import BookForm from "./pages/books/BookForm";
import BookDetails from "./pages/books/BookDetails";
import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";
import UserDetails from "./pages/users/UserDetails";
import RentalList from "./pages/rentals/RentalList";
import RentalForm from "./pages/rentals/RentalForm";
import RentalDetails from "./pages/rentals/RentalDetails";
import NotFound from "./pages/other/NotFound";
import HomePage from "./pages/other/HomePage";
import LoginPage from "./pages/other/LoginPage";
import HelpPage from "./pages/other/HelpPage";
import ArchivedRentalsList from "./pages/rentals/ArchivedRentalsList";
import ProfilePage from "./pages/other/ProfilePage";
import AccessDenied from "./pages/other/AccessDeniedPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPasswordPage from "./pages/other/ForgotPasswordPage";
import NotificationsPage from "./pages/other/NotificationsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute>
              <BookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/edit/:id"
          element={
            <ProtectedRoute>
              <BookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rentals"
          element={
            <ProtectedRoute>
              <RentalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/add"
          element={
            <ProtectedRoute>
              <RentalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/edit/:id"
          element={
            <ProtectedRoute>
              <RentalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/:id"
          element={
            <ProtectedRoute>
              <RentalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archived-rentals"
          element={
            <ProtectedRoute>
              <ArchivedRentalsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
