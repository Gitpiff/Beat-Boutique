import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getProductById } from '../../redux/products';
import { getProductReview } from '../../redux/reviews';
import { addProductToCart } from '../../redux/shopping-cart';
import ProductReviews from '../ProductReviews';
import ReviewButton from '../ProductReviews/ReviewButton';
import ToastContent from './ToastContent';
import './ProductDetails.css';
import 'react-toastify/dist/ReactToastify.min.css';

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

  const notify = () => {
    toast.success(
      <ToastContent
        imageUrl={product.images[0].image_url}
        productName={product.name}
        price={product.price}
      />,
      {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      },
    );
  };

  // Get selected product
  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getProductReview(productId));
  }, [dispatch, productId]);

  const addToCart = () => {
    dispatch(addProductToCart(product));
    notify();
  };

  if (!product) return <h1>Loading...</h1>;
  return (
    <section className="flex-wrapper">
      <ToastContainer stacked />
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
              <button className="btn confirm-btn" onClick={addToCart}>
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

      <div className="product-reviews">
        <h2>Product Reviews</h2>
        {reviews[0] === null || reviews[0].error ? (
          <>
            {sessionUser && sessionUser.id === product.owner_id ? (
              <h1>No reviews found </h1>
            ) : (
              <h1>There are no reviews for this product yet. </h1>
            )}
          </>
        ) : (
          <>
            <ProductReviews productId={productId} product={product} />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
