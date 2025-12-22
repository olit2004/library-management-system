import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response, 
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    
    
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      refresh()
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      originalError: error
    });
  }
);


export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const getMe = () => api.get('/me');
export const logout = () => api.get('/logout');
export const refresh = () => api.get('/refresh');


export default api;