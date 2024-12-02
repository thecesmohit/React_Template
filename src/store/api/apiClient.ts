import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;