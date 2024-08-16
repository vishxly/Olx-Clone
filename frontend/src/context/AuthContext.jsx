import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Import the default axios package

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://olxclone-backend.vercel.app/api/users/profile");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("https://olxclone-backend.vercel.app/api/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      await fetchUser();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post("https://olxclone-backend.vercel.app/api/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      await fetchUser();
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
