import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('stubblesched-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('stubblesched-user');
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (profile) => {
    const nextUser = {
      ...profile,
      loginTime: new Date().toISOString(),
    };

    setUser(nextUser);
    localStorage.setItem('stubblesched-user', JSON.stringify(nextUser));
    return nextUser;
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      if (!response.data?.success) {
        return { success: false, error: response.data?.message || 'Unable to login' };
      }

      persistUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await signupUser({ email, password, name });
      if (!response.data?.success) {
        return { success: false, error: response.data?.message || 'Unable to signup' };
      }

      persistUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed. Please try again.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stubblesched-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
