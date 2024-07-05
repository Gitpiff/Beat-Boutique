import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductReview } from '../../redux/reviews';
import { FaStar } from 'react-icons/fa';
import DeleteReviewButton from './DeleteReviewButton';
import EditReviewButton from './EditReviewButton';
import './ProductReviews.css';

const ProductReviews = () => {
  const dispatch = useDispatch();

  // Get Product Id
  const { productId } = useParams();

  // Get session user
  const sessionUser = useSelector((state) => state.session.user);

  // Get reviews
  const values = useSelector((state) => state.reviews);
  const reviews = Object.values(values);

  const userRatings = reviews.reduce((sum, review) => {
    const rating = sum.rating + review.rating;
    return rating / reviews.length;
  });

  useEffect(() => {
    dispatch(getProductReview(productId));
  }, [dispatch, productId]);

  const getDate = (date) => {
    const newDate = new Date(date);

    const currentDate = new Date();
    const daysApart = currentDate - newDate;
    const daysPassed = Math.floor(daysApart / (1000 * 60 * 60 * 24));

    if (daysPassed === 0) return 'Today';

    return `${daysPassed} days ago`;
  };

  if (!values) return <h1>Loading...</h1>;

  return (
    <section>
      <h1>
        Average Rating:{' '}
        {reviews.length === 1 ? userRatings.rating : userRatings.toFixed(1)}
      </h1>
      {reviews.map((review) => (
        <div className="reviews" key={review?.id}>
          <div className="user-reviews">
            <div className="users">
              <h3>
                {review?.user.first_name} {review?.user.last_name}
              </h3>

              <small>
                {getDate(review?.created_at) === 'Today'
                  ? 'Today'
                  : getDate(review?.created_at)}
              </small>
            </div>

            <p>
              {[...Array(review.rating)].map((rating) => (
                <FaStar key={rating} />
              ))}
            </p>
            <p>{review?.review}</p>
          </div>

          {sessionUser && sessionUser.id === review?.user_id && (
            <div className="btn-section">
              <EditReviewButton review={review} />
              <DeleteReviewButton review={review} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default ProductReviews;
