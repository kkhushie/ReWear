import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("rewear_token");
    localStorage.removeItem("rewear_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600">ReWear</Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/browse" className="hover:text-blue-600">Browse</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-600">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
