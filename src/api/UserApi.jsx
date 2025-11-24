//axios instance for user management API calls
import axios from 'axios';

// Base API endpoint
const API ="https://unexaminable-dayna-remittable.ngrok-free.dev/tingeWorld";

// Function to get all users
export const getAllUsers = ()=>axios.get( `${API}/users/getUsers`, {
  headers: { "ngrok-skip-browser-warning": "true" }
})
// Function to create a new user
export const createUser = (data) => axios.post(`${API}/users/register`, data,{
  headers: { "ngrok-skip-browser-warning": "true" }
});

// Function to update an existing user
export const updateUser = (id, data) => axios.put(`${API}/users/updateUser/${id}`, data,{
  headers: { "ngrok-skip-browser-warning": "true" }
});

// Function to delete a user
export const deleteUser = (id) => axios.delete(`${API}/users/deleteUser/${id}`,{
  headers: { "ngrok-skip-browser-warning": "true" }
});
