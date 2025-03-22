import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useContext(ProductContext);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/add-product"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
        >
          Add New Product
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-600 font-bold">${product.price}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              </div>
              
              <div className="border-t px-4 py-3 bg-gray-50 flex justify-between">
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
                <div className="space-x-2">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;