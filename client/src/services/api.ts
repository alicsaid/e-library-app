import api from "./axios"; // Importuj Axios instancu
import { Book, User, Rental } from "../types";

// Knjige
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const createBook = async (
  book: Omit<Book, "book_id" | "created_at" | "updated_at">
): Promise<Book> => {
  const response = await api.post<Book>("/books", book);
  return response.data;
};

export const updateBook = async (
  id: number,
  book: Partial<Omit<Book, "book_id" | "created_at" | "updated_at">>
): Promise<Book> => {
  const response = await api.put<Book>(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

// Korisnici
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (
  user: Omit<User, "user_id" | "created_at" | "updated_at">
): Promise<User> => {
  const response = await api.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<Omit<User, "user_id" | "created_at" | "updated_at">>
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Rentanja
export const getRentals = async (): Promise<Rental[]> => {
  const response = await api.get<Rental[]>("/rentals");
  return response.data;
};

export const getRentalById = async (id: number): Promise<Rental> => {
  const response = await api.get<Rental>(`/rentals/${id}`);
  return response.data;
};

export const createRental = async (
  rental: Omit<Rental, "rental_id">
): Promise<Rental> => {
  const response = await api.post<Rental>("/rentals", rental);
  return response.data;
};

export const updateRental = async (
  id: number,
  rental: Partial<Omit<Rental, "rental_id">>
): Promise<Rental> => {
  const response = await api.put<Rental>(`/rentals/${id}`, rental);
  return response.data;
};

export const deleteRental = async (id: number): Promise<void> => {
  await api.delete(`/rentals/${id}`);
};

export const getArchivedRentals = async (): Promise<Rental[]> => {
  try {
    const response = await api.get<Rental[]>("/rentals/archived");
    return response.data;
  } catch (error) {
    console.error("Error fetching archived rentals:", error);
    throw new Error("Failed to fetch archived rentals");
  }
};

export const archiveRental = async (id: number): Promise<Rental> => {
  const response = await api.patch<Rental>(`/rentals/${id}/archive`);
  return response.data;
};

export const getNotificationsCount = async (): Promise<number> => {
  try {
    const response = await api.get<{ count: number }>("/notifications-count");
    //console.log(response.data); // Proveri šta se tačno vraća
    return response.data.count; // Vraća samo broj notifikacija
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return 0;
  }
};

export const getNotificationRentals = async (): Promise<Rental[]> => {
  try {
    const response = await api.get("/notifications");
    //console.log("API Response:", response.data); // Log the response data

    // Ensure the response contains the 'rentals' property and it's an array
    if (response.data && Array.isArray(response.data.rentals)) {
      return response.data.rentals;
    } else {
      console.error(
        "Expected 'rentals' to be an array but got:",
        response.data.rentals
      );
      return []; // Return empty array if 'rentals' is not an array
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return []; // In case of error, return an empty array
  }
};

// Modify changePassword API call to include JWT token
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/auth/change-password",
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to change password");
  }
};
