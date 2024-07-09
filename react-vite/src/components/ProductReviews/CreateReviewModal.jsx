import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { createNewReview } from '../../redux/reviews';
import './ProductReviews.css';
import { useParams } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';

export default function CreateReviewModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState('');
  const { productId } = useParams();

  useEffect(() => {
    const errs = {};

    if (review && review.length < 10)
      errs.review = 'Review must be 10 characters at minimum';
    if (review.length > 500) errs.review = 'Review must be 500 characters at maximum';
    if (stars === 0) errs.stars = 'Star rating must be between 1 and 5';

    setErrors(errs);
  }, [review, stars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const reviewPayload = {
      review,
      rating: stars,
    };

    return dispatch(createNewReview(productId, reviewPayload))
      .then(() => {
        closeModal();
      })
      .catch(async () => {
        setErrors({
          review: 'Review must be 10 characters at minimum',
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="reviews-container">
        <h2>Leave a review</h2>

        <textarea
          placeholder="Leave your review here.."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          cols="77"
          rows="10"
        />

        {errors.review && <span className="errors">{errors.review}</span>}

        <div className="starsContainer">
          {[...Array(5)].map((stars, index) => {
            index += 1;
            return (
              <>
                <div key={`star${index}`}>
                  <button
                    id="stars"
                    className={index <= (hover || stars) ? 'star yellow' : 'star'}
                    onClick={() => setStars(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <CiStar />
                  </button>
                </div>
              </>
            );
          })}
        </div>
        {/* {errors.stars && <span>{errors.stars}</span>} */}
      </form>
    </div>
  );
}
