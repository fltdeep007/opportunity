import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useForm } from 'react-hook-form';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAddMode = !id;
  const { fetchProduct, addProduct, updateProduct } = useContext(ProductContext);
  const [loading, setLoading] = useState(isAddMode ? false : true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      const getProduct = async () => {
        try {
          const product = await fetchProduct(id);
          if (product) {
            // Set form data
            reset({
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image
            });
          } else {
            setError('Product not found');
          }
        } catch (err) {
          setError('Error fetching product data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getProduct();
    }
  }, [id, isAddMode, fetchProduct, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Parse price as a float
      const productData = {
        ...data,
        price: parseFloat(data.price)
      };

      if (isAddMode) {
        await addProduct(productData);
        navigate('/products');
      } else {
        await updateProduct(id, productData);
        navigate(`/products/${id}`);
      }
    } catch (err) {
      setError(`Failed to ${isAddMode ? 'add' : 'update'} product`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/products" className="text-blue-500 hover:text-blue-700">
          ← Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isAddMode ? 'Add New Product' : 'Edit Product'}
          </h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Price must be greater than 0' }
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                {...register('image', { required: 'Image URL is required' })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                {...register('description', { required: 'Description is required' })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Link
                to="/products"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;