import axios from "axios";
import { API_BASE_URL } from "@src/constants/api";
import { AUTH } from "@src/constants";

// Public axios instance for non-authenticated requests
export const publicAxios = axios.create({
  baseURL: API_BASE_URL + '/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Private axios instance for authenticated requests
export const privateAxios = axios.create({
  baseURL: API_BASE_URL + '/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token dynamically
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect
      localStorage.removeItem('authToken');
      window.location.href = AUTH;
    }
    return Promise.reject(error);
  }
);