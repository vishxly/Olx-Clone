import { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios directly
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://olxclone-backend.vercel.app/api/items/unsold");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handlePurchase = async (itemId) => {
    if (!user) {
      alert("You must be logged in to purchase an item.");
      return;
    }

    try {
      await axios.put(`https://olxclone-backend.vercel.app/api/items/purchase/${itemId}`);
      alert("Item purchased successfully!");
      
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error purchasing item:", error);
      alert("Failed to purchase item. Please try again.");
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800 dark:text-white">
        Available Items
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl hover:scale-105"
          >
            <div className="p-6">
              <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
                {item.name}
              </h2>
              <p className="mb-4 text-xl font-bold text-green-600 dark:text-green-400">
                ${item.price.toFixed(2)}
              </p>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                Seller: {item.seller.username}
              </p>
              <button
                onClick={() => handlePurchase(item._id)}
                className="w-full py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
