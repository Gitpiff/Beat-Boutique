import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/products';
import ProductDetail from './ProductDetail';
import styles from './LandingPage.module.css';
import drumSet from '../../../../images/drums-set.jpeg';
import records from '../../../../images/record-rack.jpeg';
import recordStore from '../../../../images/record-store.jpeg';
import concert from '../../../../images/concert.jpeg';

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const size = 10;

  const products = useSelector((state) => state.products);
  const allProducts = Object.values(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({ page, size }));
  }, [dispatch, page]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (products.products === null) return <h1>Loading...</h1>;

  return (
    <main id={styles.productSection}>
      <div className={`flex ${styles.imageContainer}`}>
        <div className={styles.imgContainer}>
          <img className={styles.image1} src={records} alt="records" />
          <img className={styles.image2} src={drumSet} alt="drum sets" />
          <img className={styles.image3} src={recordStore} alt="record store" />
          <img className={styles.image4} src={concert} alt="concert crowd" />
        </div>
      </div>

      <div className={`flex ${styles.productList}`}>
        <h1 className={styles.header}>Selling right now</h1>
        <div className={`flex ${styles.productContainer}`}>
          {allProducts.map((products) => (
            <ProductDetail key={products.id} product={products} />
          ))}
        </div>
        <button className="btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </main>
  );
};

export default LandingPage;
