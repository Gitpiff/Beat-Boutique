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
  console.log(productId);

  // Get product from redux store
  const product = useSelector((state) =>
    state.products ? state.products[productId] : null,
  );

  // Get session user
  const sessionUser = useSelector((state) => state.session.user);

  // Get reviews
  const reviews = Object.values(useSelector((state) => state.reviews));
  //console.log(reviews);
  //const reviewsLength = reviews.length;
  //console.log(reviewsLength);
  // Get selected product
  useEffect(() => {
    dispatch(getProductById(productId));

    if (reviews.length) {
      dispatch(getProductReview(productId));
    }
  }, [dispatch, productId, reviews.length]);

  if (!product) return <h1>Loading...</h1>;
  return (
    <section>
      <div className="product-details">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Conditional rendering of images if they exist */}
          {product &&
            product.images &&
            product.images.map((image) => (
              <img
                style={{ width: '400px', height: '500px' }}
                key={image.id}
                src={image.image_url}
                alt={`Product image ${product.name}`}
              />
            ))}
        </div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <p>Quantity Left: {product.inventory}</p>

        {sessionUser && sessionUser.id !== product.owner_id && (
          <button
            className="btn confirm-btn"
            onClick={() => dispatch(addProductToCart(product))}
          >
            Add to Cart
          </button>
        )}

{/*         
        <div>
          {sessionUser && sessionUser.id !== product.owner_id && Array.isArray(reviews) && !reviews.some((review) => review?.user_id === sessionUser.id) && (
            <ReviewButton productId={productId} userId={sessionUser?.id} />
          )}
        </div> */}

        <div className="product-reviews">
          {reviews[0] === null ? (
            <>
              <h1>No Reviews yet... be the first one to post a review! </h1>

              <div>
                {sessionUser && sessionUser.id !== product.owner_id && Array.isArray(reviews) && !reviews.some((review) => review?.user_id === sessionUser.id) && (
                  <ReviewButton productId={productId} userId={sessionUser?.id} />
                )}
             </div>
            </>)
           : (
            <ProductReviews productId={productId} product={product} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
