// src/services/api.ts
import axios from "axios";

// Postavi osnovni URL za API
const API_BASE_URL = "http://localhost:5001/api";

// Kreiraj Axios instancu
const api = axios.create({
  baseURL: API_BASE_URL, // Postavljanje osnovnog URL-a za API
  timeout: 10000, // Timeout za sve zahteve
  headers: {
    "Content-Type": "application/json", // Podrazumevani Content-Type
  },
});

// Interceptor koji dodaje Bearer token za svaki zahtev
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Pretpostavljamo da je token u localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Dodaj token u Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Ako ima greške u interceptoru, odbaci zahtev
  }
);

export default api; // Exportuj instancu da bi se koristila u drugim delovima aplikacije
