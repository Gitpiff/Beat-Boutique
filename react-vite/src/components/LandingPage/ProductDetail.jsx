import { Link } from 'react-router-dom';
import DeleteProductButton from '../DeleteProduct/DeleteProductButton';
import styles from './LandingPage.module.css';

const ProductDetail = ({ product, currentUser }) => {
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
        {currentUser ? (
          <div className="product-actions">
            <Link to={`/products/${product?.id}/edit`} className="btn edit-btn">
              Edit
            </Link>
            <DeleteProductButton product={product?.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetail;
