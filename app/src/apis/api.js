import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  withCredentials: true,
});

api.defaults.withCredentials = true;

export default api;
