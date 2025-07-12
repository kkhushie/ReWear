import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Dummy data (replace with API calls later)
    setListings([
      { id: 1, name: "Blue Shirt" },
      { id: 2, name: "Red Dress" },
      { id: 3, name: "Sneakers" },
      { id: 4, name: "Hoodie" },
    ]);

    setPurchases([
      { id: 1, name: "Denim Jacket" },
      { id: 2, name: "White Top" },
      { id: 3, name: "Black Jeans" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
                <Navbar/>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-300"></div>

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
          <h3 className="text-lg font-semibold mb-3">My Listings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {listings.map((item) => (
              <div key={item.id} className="bg-gray-200 rounded-md h-32 flex items-center justify-center text-gray-700 font-medium">
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Purchases */}
        <div>
          <h3 className="text-lg font-semibold mb-3">My Purchases</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {purchases.map((item) => (
              <div key={item.id} className="bg-gray-200 rounded-md h-32 flex items-center justify-center text-gray-700 font-medium">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
