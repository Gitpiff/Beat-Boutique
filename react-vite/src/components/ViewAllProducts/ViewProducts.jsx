import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/products';
import styles from './ViewAllProducts.module.css';

const ViewAllProducts = () => {
  const products = useSelector((state) => state.products);
  const allProducts = Object.values(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (!allProducts.length) return <h1>Loading...</h1>;

  return (
    <div className={styles.viewAllProducts}>
      <h1>All Products</h1>
      <div className={styles.productGrid}>
        {allProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image_url} alt={product.name} />
            <div className={styles.details}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>Quantity Left: {product.inventory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllProducts;
