import React, { createContext, useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateRandomProductId = (existingProducts = [], minValue = 2000, maxValue = 2999999) => {
    const existingIds = existingProducts.map(product => Number(product.id));
    
    let randomId;
    do {
      randomId = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    } while (existingIds.includes(randomId));
    
    return randomId;
  };


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      const productInState = products.find(p => p.id === parseInt(id));
      
      if (productInState) {
        return productInState;
      } else {
        const data = await productService.getProductById(id);
        return data;
      }
    } catch (err) {
      setError(`Failed to fetch product with ID ${id}.`);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [products]);

  const addProduct = useCallback(async (product) => {
    try {
      setLoading(true);
      const apiResponse = await productService.addProduct(product);
      const clientId = generateRandomProductId(products);
      const newProduct = { 
        ...product, 
        id: clientId, 
        apiId: apiResponse.id 
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Failed to add product.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [products]);

  const updateProduct = useCallback(async (id, product) => {
    try {
      setLoading(true);
      const updatedProduct = await productService.updateProduct(id, product);
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === parseInt(id) ? { ...p, ...product } : p)
      );
      return updatedProduct;
    } catch (err) {
      setError(`Failed to update product with ID ${id}.`);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  const deleteProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== parseInt(id)));
      return { success: true };
    } catch (err) {
      setError(`Failed to delete product with ID ${id}.`);
      console.error(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      fetchProduct,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};