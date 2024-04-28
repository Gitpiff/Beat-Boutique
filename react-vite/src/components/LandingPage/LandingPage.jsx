import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../redux/products';
import styles from './LandingPage.module.css';
import instruments from '../../../../images/instruments.jpeg';
import hipHop from '../../../../images/hip-hop-image.jpeg';
import jazzPlayer from '../../../../images/jazz-player.jpeg';
import rock from '../../../../images/rock_image.jpeg';

const LandingPage = () => {
  const products = useSelector((state) => state.products);
  const allProducts = Object.values(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (allProducts.includes(null)) return <h1>Loading...</h1>;

  return (
    <>
      <div className={`flex ${styles.imageContainer}`}>
        <div className={styles.imgContainer}>
          <img className={styles.image1} src={hipHop} alt="hiphop-artist" />
          <img className={styles.image2} src={instruments} alt="instruments" />
          <img className={styles.image3} src={jazzPlayer} alt="jazz player" />
          <img className={styles.image4} src={rock} alt="rock star" />
        </div>
      </div>

      <div className={`flex ${styles.productList}`}>
        <h2>Selling right now</h2>
        <div className={`flex ${styles.productContainer}`}>
          {allProducts.map((products) => (
            <div key={products.id} className={styles.productDetails}>
              <Link to={`products/${products.id}`}>
                <img src={products.images[0]?.image_url} alt="products.name" />
                <div className={styles.details}>
                  <h3>{products.name}</h3>
                  <p>${products.price}</p>
                  <p>{products.description}</p>
                  <p>Quantity Left: {products.inventory}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
