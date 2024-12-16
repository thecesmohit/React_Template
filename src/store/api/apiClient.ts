import axios from 'axios';

const apiClient= (token: any) => axios.create({
  baseURL: 'http://localhost:7050/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
});
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default apiClient;


