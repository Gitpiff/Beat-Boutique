import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../redux/products';
import { getProductReview } from '../../redux/reviews';
import ProductReviews from '../ProductReviews';
import ReviewButton from '../ProductReviews/ReviewButton';
import { addProductToCart } from '../../redux/shopping-cart';
import './ProductDetails.css';

const ProductDetails = () => {
  const dispatch = useDispatch();

  // Get Product Id
  const { productId } = useParams();

  // Get product from redux store
  const product = useSelector((state) =>
    state.products ? state.products[productId] : null,
  );

  // Get session user
  const sessionUser = useSelector((state) => state.session.user);

  // Get reviews
  const reviews = Object.values(useSelector((state) => state.reviews));

  // Get selected product
  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getProductReview(productId));
  }, [dispatch, productId]);

  if (!product) return <h1>Loading...</h1>;
  return (
    <section className="flex-wrapper">
      <div className="product-details">
        <div>
          {/* Conditional rendering of images if they exist */}
          {product &&
            product.images &&
            product.images.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={`Product image ${product.name}`}
              />
            ))}
        </div>
        <div className="product-description">
          <div className="p-details">
            <h3>{product.name}</h3>
            <p>
              ${product.price} <small>USD</small>
            </p>
          </div>
          <div className="p-details">
            <p>
              <strong>Category:</strong> {product.type}
            </p>
            <p>{product.description}</p>
          </div>

          <p>Quantity Left: {product.inventory}</p>

          <div className="p-details">
            {sessionUser && sessionUser.id !== product.owner_id && (
              <button
                className="btn confirm-btn"
                onClick={() => dispatch(addProductToCart(product))}
              >
                Add to Cart
              </button>
            )}

            {sessionUser &&
              sessionUser.id !== product.owner_id &&
              Array.isArray(reviews) &&
              !reviews.some((review) => review?.user_id === sessionUser.id) && (
                <ReviewButton productId={productId} userId={sessionUser?.id} />
              )}
          </div>
        </div>
      </div>

      <h2>Product Reviews</h2>

      <div className="product-reviews">
        {reviews[0] === null || reviews[0].error && product.owner_id !== sessionUser ? (
          <>
            <h1 style={{marginBottom: "100px"}}>Your Product Does Not Have Any Reviews Yet...</h1>
          </>
        ) : (
          <>
            <h1 style={{marginBottom: "100px"}}>No Reviews yet... be the first one to post a review! </h1>
            <ProductReviews productId={productId} product={product} />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
