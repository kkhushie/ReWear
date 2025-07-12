import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';
import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';

// import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/browse" element={<Browse />} />
    <Route path="/item/:id" element={<ItemDetail />} />

    {/* 🔒 Protected Route */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

  </Routes>
  );
}

export default App;