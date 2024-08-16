import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ListItem from "./components/ListItem";
import MyItems from "./components/MyItems";
import MyPurchases from "./components/MyPurchases";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col w-full min-h-screen text-black transition-colors duration-300 dark:bg-black dark:text-white">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container flex-1 w-full px-6 py-8 mx-auto dark:bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/list-item" element={<ListItem />} />
              <Route path="/my-items" element={<MyItems />} />
              <Route path="/my-purchases" element={<MyPurchases />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
