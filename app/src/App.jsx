import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <UserProvider>
          <ProductProvider>
            <Navigation />
            <div className="py-6">
              <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/:id/edit" element={<UserForm />} />
                <Route path="/add-user" element={<UserForm />} />

                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/add-product" element={<ProductForm />} />


                <Route path="*" element={
                  <div className="container mx-auto p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="mb-4">The page you're looking for doesn't exist.</p>
                    <a href="/" className="text-blue-500 hover:text-blue-700">Go back to home</a>
                  </div>
                } />
              </Routes>
            </div>
          </ProductProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;