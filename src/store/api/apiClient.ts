import axios from 'axios';

const apiClient= (token: any) => axios.create({
  baseURL: 'http://localhost:7050/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
});

export default apiClient;