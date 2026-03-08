/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// ✅ 1. Create context
const AuthContext = createContext();

// ✅ 2. Custom Hook - Must be outside component
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
      console.log("🔁 Loading user from localStorage:", parsedUser);
      setUser(parsedUser);
      } catch (error) {
        console.error("❌ Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
      }
      
    }
  }, []);

  const login = (userData , token) => {
    const fullUser = { ...userData, token};
    console.log("🔑 User logged in:", fullUser);
    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
  };

  const logout = () => {
    console.log("🔒 User logged out");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

