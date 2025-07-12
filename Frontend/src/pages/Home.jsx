import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const categories = ["Men", "Women", "Kids", "Accessories", "Footwear"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data.products || []);
        setFilteredProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load featured products.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = product.title.toLowerCase().includes(searchLower);
        const tagsMatch = product.tags?.some(tag => 
          tag.toLowerCase().includes(searchLower)
        );
        return titleMatch || tagsMatch;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect above
  };

  const top3Products = filteredProducts.slice(0, 3);
  const restProducts = filteredProducts.slice(3, 8);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-10 bg-gradient-to-r from-blue-100 to-blue-200 text-center">
        <h2 className="text-4xl font-bold mb-4">♻️ Swap Clothes. Save Planet.</h2>
        <p className="mb-6 text-gray-700">Start swapping or browse items from others!</p>
        <form onSubmit={handleSearch} className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search items by name or tag..."
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        <div className="flex justify-center gap-4">
          <Link to="/upload" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Start Swapping</Link>
          <Link to="/browse" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Browse Items</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/browse?category=${cat}`}
              className="bg-white p-4 rounded shadow text-center hover:shadow-md cursor-pointer hover:bg-blue-50 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Top 3 Featured */}
      {top3Products.length > 0 ? (
        <section className="px-6 pt-4 pb-10 bg-yellow-50">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {searchTerm ? "🔍 Search Results" : "🔥 Top Picks"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {top3Products.map((product) => (
              <Link to={`/item/${product._id}`} key={product._id} className="bg-white rounded shadow hover:shadow-lg transition">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/250x300?text=Item"}
                  alt={product.title}
                  className="w-full h-52 object-cover rounded-t"
                />
                <div className="p-3">
                  <h4 className="text-lg font-semibold text-blue-700">{product.title}</h4>
                  <p className="text-sm text-gray-500">{product.condition} • Size: {product.size}</p>
                  {product.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : searchTerm ? (
        <section className="px-6 pt-4 pb-10 bg-yellow-50">
          <h3 className="text-2xl font-semibold mb-6 text-center">🔍 No results found for "{searchTerm}"</h3>
        </section>
      ) : null}

      {/* More Featured Items */}
      <section className="px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-4">
          {searchTerm ? "More Results" : "More Items"}
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {restProducts.length > 0 ? (
            restProducts.map((product) => (
              <div key={product._id} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/250x300?text=Item"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h4 className="text-lg font-semibold text-blue-700 mb-1">{product.title}</h4>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Size:</strong> {product.size} | <strong>Condition:</strong> {product.condition}
                </p>
                {product.tags?.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {product.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  to={`/item/${product._id}`}
                  className="mt-3 inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Item
                </Link>
              </div>
            ))
          ) : !searchTerm ? (
            <p className="text-gray-600 col-span-full">No featured items found.</p>
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-sm text-center p-4 mt-auto">
        <p>© {new Date().getFullYear()} ReWear. All rights reserved. Made with 💙.</p>
      </footer>
    </div>
  );
};

export default Home;