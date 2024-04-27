import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "./OpenModalButton";

const DeleteReviewButton = ({review}) => {

    return (
        <OpenModalButton
            buttonText="Delete"
            review={review}
            modalComponent={<DeleteReviewModal review={review} />}
        />
    )
}

export default DeleteReviewButton;