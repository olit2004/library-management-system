// hooks/useUsers.js
import { useState, useCallback } from "react";
import { userService } from "../api/user";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    const res = await userService.getAllUsers(page);
    
    if (res.success) {
    
      setUsers(res.data.data); 
      setPagination({
        totalPages: res.data.meta.totalPages,
        currentPage: res.data.meta.page
      });
    }
    setLoading(false);
    return res;
  }, []);

  const deactivateMember = async (id) => {
    const res = await userService.deactivateUser(id);
    if (res.success) {
      await fetchUsers(pagination.currentPage);
    }
    return res;
  };

  return { users, loading, pagination, fetchUsers, deactivateMember };
};