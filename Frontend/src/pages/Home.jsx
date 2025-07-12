import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const categories = ["Men", "Women", "Kids", "Accessories", "Footwear", "Winter Wear"];
const products = new Array(4).fill(null); // dummy product cards

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <Navbar />


      {/* Hero + Search */}
      <section className="px-6 py-10 bg-gradient-to-r from-blue-100 to-blue-200 text-center">
        <h2 className="text-4xl font-bold mb-4">Swap Clothes. Save Planet.</h2>
        <p className="mb-6 text-gray-700">Start swapping or browse items from others!</p>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search items..."
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">Search</button>
        </div>
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
            <div key={idx} className="bg-white p-4 rounded shadow text-center hover:shadow-md cursor-pointer">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Product Listings */}
      <section className="px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-4">Featured Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((_, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              <div className="bg-gray-200 h-40 mb-4 rounded"></div>
              <h4 className="text-lg font-semibold">Product Title</h4>
              <p className="text-sm text-gray-500">Description here...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
