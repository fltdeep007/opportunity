import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            BlueMedix Dashboard
          </Link>
        </div>
        
        <div className="flex space-x-6">
          <div className="relative group">
            <Link
              to="/users"
              className={`hover:text-blue-200 ${
                location.pathname.includes('/users') ? 'text-blue-200 font-bold' : ''
              }`}
            >
              Users
            </Link>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded p-2 w-36 z-10">
              <Link to="/users" className="block py-1 px-2 hover:bg-blue-100 rounded">
                All Users
              </Link>
              <Link to="/add-user" className="block py-1 px-2 hover:bg-blue-100 rounded">
                Add User
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <Link
              to="/products"
              className={`hover:text-blue-200 ${
                location.pathname.includes('/products') ? 'text-blue-200 font-bold' : ''
              }`}
            >
              Products
            </Link>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded p-2 w-36 z-10">
              <Link to="/products" className="block py-1 px-2 hover:bg-blue-100 rounded">
                All Products
              </Link>
              <Link to="/add-product" className="block py-1 px-2 hover:bg-blue-100 rounded">
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;