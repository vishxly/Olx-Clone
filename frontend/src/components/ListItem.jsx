import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios directly
import { AuthContext } from "../context/AuthContext";

const ListItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to list an item.");
      return;
    }

    try {
      await axios.post("https://olxclone-backend.vercel.app/api/items", { name, price: parseFloat(price) });
      alert("Item listed successfully!");
      navigate("/my-items");
    } catch (error) {
      console.error("Error listing item:", error);
      alert("Failed to list item. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="mb-6 text-3xl font-bold">List an Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-full flex items-center gap-2 justify-center text-slate-500
            shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
            transition-all
            hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            hover:text-violet-500"
        >
          List Item
        </button>
      </form>
    </div>
  );
};

export default ListItem;
