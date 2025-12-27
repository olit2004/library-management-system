// services/userService.js
import api from "./auth";

export const userService = {
  
  getAllUsers: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users?page=${page}&limit=${limit}`);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Failed to fetch users" 
      };
    }
  },

  deactivateUser: async (userId) => {
    try {
      
      const response = await api.delete("/users", { data: { userId } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: "Failed to deactivate user" };
    }
  }
};