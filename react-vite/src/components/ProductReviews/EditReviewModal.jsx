import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductReview } from '../../redux/reviews';
import { useModal } from '../../context/Modal';
import { FaRegStar } from 'react-icons/fa';

export default function EditReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(review.rating);
  const [newReview, setNewReview] = useState(review.review);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errs = {};

    setErrors(errs);
  }, [dispatch, stars, review, review.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const updatedReview = {
      rating: stars,
      review: newReview,
    };

    dispatch(updateProductReview(review.id, updatedReview))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        if (!data) setErrors(data.errors);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="update-review">
        <h1>Changed your mind? </h1>
        {errors.review && <span>{errors.review}</span>}
        {errors.stars && <span>{errors.stars}</span>}

        <textarea
          placeholder="Leave your new review here.."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          cols="77"
          rows="10"
        />

        <div className="starsContainer">
          {[...Array(5)].map((stars, index) => {
            index += 1;
            return (
              <>
                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                  <button
                    className={index <= (hover || stars) ? 'star yellow' : 'star'}
                    onClick={() => setStars(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <FaRegStar />
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </form>
    </section>
  );
}
