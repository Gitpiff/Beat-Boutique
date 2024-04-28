import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductReview } from '../../redux/reviews';
import DeleteReviewButton from './DeleteReviewButton';
import EditReviewButton from './EditReviewButton';

const ProductReviews = () => {
  const dispatch = useDispatch();

  // Get Product Id
  const { productId } = useParams();

  // Get session user
  const sessionUser = useSelector((state) => state.session.user);

  // Get reviews
  const values = useSelector((state) => state.reviews);
  const reviews = Object.values(values);

  useEffect(() => {
    dispatch(getProductReview(productId));
  }, [dispatch, productId]);

  const getDate = (date) => {
    const newDate = new Date(date);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    return newDate.toLocaleDateString('en-US', options);
  };


  if (!values) return <h1>Loading...</h1>;

  return (
      <section>
        <h1>
          Average Rating:{' '}
          {reviews.length > 0
            ? reviews[0]?.rating
            : (
                reviews.reduce((sum, review) => {
                  return sum + review.rating;
                }, 0) / reviews.length
              ).toFixed(1)}
        </h1>
        {reviews.map((review) => (
          <div className="reviews" key={review?.id}>
            <div className="user-reviews">
              <p>{review?.review}</p>
              <p>Rating: {review?.rating}</p>
              <p>Review posted on: {getDate(review?.created_at)}</p>
              {/* Author: {review.user_id} */}
            </div>

            {sessionUser && sessionUser.id === review?.user_id && (
              <div>
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
