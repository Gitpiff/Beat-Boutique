import EditReviewModal from './EditReviewModal';
import OpenModalButton from './OpenModalButton';

const EditReviewButton = ({ review }) => {
  return (
    <OpenModalButton
      buttonText="Edit"
      review={review}
      modalComponent={<EditReviewModal review={review} />}
      styles={'btn edit-btn'}
    />
  );
};

export default EditReviewButton;
