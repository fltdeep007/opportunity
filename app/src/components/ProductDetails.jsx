import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProduct, deleteProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productData = await fetchProduct(id);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id, fetchProduct]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(id);
      if (result.success) {
        navigate('/products');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/products" className="text-blue-500 hover:text-blue-700">
          ← Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="h-64 w-64 bg-gray-100 flex items-center justify-center rounded">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain p-4"
              />
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 mr-4">
                ${product.price}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{product.rating?.rate || 0}</span>
                <span className="text-gray-500 ml-1">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
          <Link
            to={`/products/${product.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;