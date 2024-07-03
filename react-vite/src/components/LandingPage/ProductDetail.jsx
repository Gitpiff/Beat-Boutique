import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const ProductDetail = ({ product }) => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.product}>
        <Link to={`/products/${product.id}`}>
          <img src={product.images[0]?.image_url} alt="products.name" />
          <div className={styles.productSection}>
            <div className={styles.details}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
            <p>Quantity Left: {product.inventory}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
