import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id;
      fetchUserDetails(userId);
      fetchUserData(userId);
    }
  }, []);
  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/${userId}`);
      setUser(res.data.user); // Assuming res.data = { user: { ... } }
    } catch (err) {
      console.error("Failed to fetch user details", err);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      // Fetch user's own listings
      const listingsRes = await axios.get(`http://localhost:3000/api/products/users/${userId}/products`);
      setListings(listingsRes.data);
      console.log(listingsRes.data);

      // Fetch user's purchases (you need to have this API)
      const purchasesRes = await axios.get(`http://localhost:3000/api/users/${userId}/purchases`);
      setPurchases(purchasesRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 relative group">
  <img
    src={user?.profileImage || "https://..."}
    alt="Profile"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
    <Link className="text-white text-sm">Edit</Link>
  </div>
</div>


          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
              <p><span className="font-medium">Username:</span> {user?.username}</p>
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Joined:</span> Jan 2024</p>
              <p><span className="font-medium">Location:</span> India</p>
              <p><span className="font-medium">Swaps Done:</span> 12</p>
              <p><span className="font-medium">Rating:</span> ⭐ 4.5</p>
            </div>

            <div className="bg-blue-100 p-4 rounded text-sm text-blue-800">
              Welcome back, <strong>{user?.username}</strong>! You can manage your listings and view your purchases here.
            </div>
          </div>
        </div>

    {/* Listings */}
<div className="mb-8">
<div className="flex justify-between items-center mb-3">
  <h3 className="text-lg font-semibold">My Listings</h3>
  <Link
    to= "/upload" 
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
  >
    + Add New Item
  </Link>
</div>  {listings.length === 0 ? (
    <p className="text-gray-600 text-sm">You haven't listed anything yet.</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {listings.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-200"
        >
          <img
            src={item.images?.[0] || "https://via.placeholder.com/200"}
            alt={item.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <h4 className="font-semibold text-blue-700 truncate">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.condition}</p>
            <p
              className={`text-xs mt-1 inline-block px-2 py-1 rounded-full font-medium ${
                item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}
            >
              {item.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Purchases */}
        <div>
          <h3 className="text-lg font-semibold mb-3">My Purchases</h3>
          {purchases.length === 0 ? (
            <p className="text-gray-600 text-sm">No purchases yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {purchases.map((item) => (
                <div key={item._id} className="bg-gray-200 rounded-md h-32 flex items-center justify-center text-gray-700 font-medium">
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
