import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;