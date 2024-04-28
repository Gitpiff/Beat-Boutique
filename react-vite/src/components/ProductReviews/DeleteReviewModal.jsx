import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteProductReview } from '../../redux/reviews';

const DeleteReviewModal = ({ review }) => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProductReview(review.id))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        return data;
      });
  };

  return (
    <div className="deleteReviewModal">
      <h2>Confirm Delete</h2>
      <span>Are you sure you want to delete this review?</span>
      <button className="btn delete-btn" onClick={handleDelete}>
        Yes (Delete Review)
      </button>
      <button className="btn confirm-btn" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;
