import { createContext, useState, useEffect, useContext } from 'react';
import { getMe, login as loginApi, logout as logoutApi } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. On mount, check if the user has a valid session/cookie
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await getMe(); // Hits GET /api/auth/me
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // 2. Login helper
const login = async (credentials) => {
const { data } = await loginApi(credentials);
setUser(data.user); // Store user object (includes role: 'LIBRARIAN' or 'MEMBER')
return data;
  };

  // 3. Logout helper
  const logout = async () => {
    await logoutApi();
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    login,
    logout,
    setUser,
    loading,
    isLibrarian: user?.role === 'LIBRARIAN',
    isMember: user?.role === 'MEMBER'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// The custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};