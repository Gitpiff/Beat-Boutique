import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProducts } from '../../redux/products';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const products = useSelector((state) => state.products);
  const allProducts = Object.values(products).slice(0, 10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (allProducts.includes(null)) return <h1>Loading...</h1>;

  return (
    <>
      <div className={`flex ${styles.imageContainer}`}>
        <div> IMAGE CONTAINER </div>
      </div>

      <div className={`flex ${styles.productList}`}>
        <h2>Selling right now</h2>
        <div className={`flex ${styles.productContainer}`}>
          {allProducts.map((products) => (
            <div key={products.id} className={styles.productDetails}>
              <img src={products.images[0]?.image_url} alt="products.name" />
              <div className={styles.details}>
                <h3>{products.name}</h3>
                <p>${products.price}</p>
                <p>{products.description}</p>
                <p>Quantity Left: {products.inventory}</p>
              </div>
            </div>
          ))}
        </div>
        <NavLink to={'/products'} className="btn">
          View Products
        </NavLink>
      </div>
    </>
  );
};

export default LandingPage;
