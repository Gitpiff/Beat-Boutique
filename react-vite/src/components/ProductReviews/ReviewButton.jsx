import CreateReviewModal from "./CreateReviewModal"
import OpenModalButton from "./OpenModalButton"
import './ProductReviews.css'

const ReviewButton = () => {
    return (
        <OpenModalButton
            buttonText="Add a new Review"
            modalComponent={<CreateReviewModal/>}
        />
    )
}

export default ReviewButton;
