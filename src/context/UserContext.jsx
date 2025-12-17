import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

// SessionStorage keys for tab-specific storage (allows multiple accounts in different tabs)
const SESSION_STORAGE_KEY = "ocufii_user_session";
const AUTH_TOKEN_KEY = "ocufii_auth_token";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Use sessionStorage for tab-specific sessions
      // This allows different accounts in different tabs
      const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

      if (token && sessionData) {
        const userData = JSON.parse(sessionData);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData) => {
    try {
      const { access_Token, ...userInfo } = userData;

      // Store in sessionStorage only (tab-specific)
      // Each tab maintains its own session independently
      sessionStorage.setItem(AUTH_TOKEN_KEY, access_Token);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userInfo));

      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Clear session storage (this tab only)
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAuthToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
