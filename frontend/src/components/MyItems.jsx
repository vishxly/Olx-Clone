import { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios directly
import { AuthContext } from "../context/AuthContext";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items/my-items`);
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    if (user) {
      fetchItems();
    }
  }, [user]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-extrabold text-center">My Items</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl hover:scale-105"
          >
            <div className="p-6">
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="mb-4 text-lg font-medium text-gray-600">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.sold
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.sold ? "Sold" : "Available"}
                </span>
                {/* <button className="px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">
                  View Details
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyItems;
