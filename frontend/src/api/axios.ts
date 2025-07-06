import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // change to your backend URL
  withCredentials: true,            // if using cookies/session auth
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
