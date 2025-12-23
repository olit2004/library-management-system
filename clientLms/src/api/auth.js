import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// Helper to format errors consistently for frontend
const formatError = (error) => ({
  message: error.response?.data?.message || 'An unexpected error occurred',
  status: error.response?.status,
  originalError: error?.response?.data
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response?.status === 401 && !originalRequest._retry) {
      
     
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(formatError(err)));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Token expired. Refreshing...');
        await refresh(); 
        
        isRefreshing = false;
        processQueue(null); 
        
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError); 
    
        console.error('Refresh failed. Session expired.');
        return Promise.reject(formatError(refreshError));
      }
    }


    return Promise.reject(formatError(error));
  }
);

// Endpoints
export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/registerMember', userData);
export const getMe = () => api.get('/me');
export const logout = () => api.get('/logout');
export const refresh = () => api.get('/refresh');

export default api;