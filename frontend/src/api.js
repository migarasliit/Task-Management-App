// frontend/src/api.js
import axios from 'axios';

// Set the base URL for all requests
const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update a task (We will use this in Step 5)
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

// Delete a task (We will use this in Step 5)
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};