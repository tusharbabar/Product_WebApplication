// services/AdminServices.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const AdminService = {
  getStats: () => axios.get(`${API_URL}/stats`),
  getUsers: () => axios.get(`${API_URL}/users`),
  getProducts: () => axios.get(`${API_URL}/products`),
};

export default AdminService;
