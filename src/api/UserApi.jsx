//axios instance for user management API calls
import axios from 'axios';
// Base API endpoint
const API ="";
// Function to get all users
export const getAllUsers = () => axios.get(API);
// Function to create a new user
export const createUser = (data) => axios.post(API, data);
// Function to update an existing user
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);
// Function to delete a user
export const deleteUser = (id) => axios.delete(`${API}/${id}`);