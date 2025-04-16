import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogNavbar from './components/Navbar';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Blog from './pages/Blog';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { ROLES } from './utils/constants';

const App = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <BlogNavbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/*" element={<Blog />} />
            
            {/* Protected routes */}
            {/* <Route element={<PrivateRoute requiredRole={ROLES.ADMIN} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route> */}
          </Routes>
        </div>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;