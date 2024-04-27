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

// return (reviews &&
//     <section>
//         {sessionUser && userReviewed.length === 0 && spot.ownerId !== userId &&
//             <div style={{ marginBottom: "15px" }}>
//                 <CreateReviewButton spotId={spotId} />
//             </div>
//         }

//         {reviews.map((review) => (
//             <div key={review.id} className='reviews'>
//                 <div style={{ fontWeight: '600' }}>{sessionUser?.id === review.User?.id ? sessionUser.firstName : (review.User?.firstName)}</div>
//                 <p style={{ color: 'gray', marginTop: "0px" }}>{review.createdAt &&
//                     reviewDate(review.createdAt)
//                 }
//                 </p>
//                 <div style={{ marginTop: "-15px" }}>{review.review}</div>
//                 {review.userId === userId &&
//                     <div style={{ marginTop: "10px", marginBottom: "15px" }}>
//                         <DeleteReviewModalButton reviewId={review.id} spotId={spotId} />
//                     </div>
//                 }
//                 <br />
//             </div>
//         ))