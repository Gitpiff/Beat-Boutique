import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "./OpenModalButton";

const DeleteReviewButton = ({review}) => {

    console.log(review)
    return (
        <OpenModalButton
            buttonText="Delete"
            review={review}
            modalComponent={<DeleteReviewModal review={review} />}
        />
    )
}

export default DeleteReviewButton;