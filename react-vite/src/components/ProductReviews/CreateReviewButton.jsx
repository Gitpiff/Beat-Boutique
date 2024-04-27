import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";

export default function CreateReviewButton({ productId }) {
    return (
        <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal productId={productId} />}
        />
    );
}