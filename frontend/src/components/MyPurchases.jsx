import { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios directly
import { AuthContext } from "../context/AuthContext";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items/my-purchases`
        );
        setPurchases(res.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-extrabold text-center">My Purchases</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {purchases.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:scale-105"
          >
            <div className="p-6">
              <h2 className="mb-3 text-2xl font-semibold text-gray-800 truncate">
                {item.name}
              </h2>
              <p className="mb-4 text-xl font-bold text-indigo-600">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                  Purchased
                </span>
                {/* <button className="font-medium text-indigo-600 transition-colors duration-300 hover:text-indigo-800">
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

export default MyPurchases;
