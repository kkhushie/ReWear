// src/pages/Browse.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Browse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products"); // Adjust URL as per your backend
        setItems(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
        <Navbar />
      <div className="p-3 sm:p-10 bg-blue-50 min-h-screen font-poppins">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        🧥 Browse Available Items
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading items...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={item.images?.[0] || "https://via.placeholder.com/250x300"}
                alt={item.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Size:</strong> {item.size}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Condition:</strong> {item.condition}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  👤 {item.owner?.username || "User"}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/item/${item._id}`}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
