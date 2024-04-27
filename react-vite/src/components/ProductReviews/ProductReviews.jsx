import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductReview } from "../../redux/reviews";
import DeleteReviewButton from "./DeleteReviewButton";
import EditReviewButton from "./EditReviewButton";

const ProductReviews = () => {
    const dispatch = useDispatch();

    // Get Product Id
    const { productId } = useParams();

   // Get session user
   const sessionUser = useSelector(state => state.session.user);
    
     // Get reviews
     const values = useSelector((state) => state.reviews);
     const reviews = Object.values(values);
    
     
     useEffect(() => {
         dispatch(getProductReview(productId))
    }, [dispatch, productId]);

    const getDate = (date) => {
        const newDate = new Date(date);
        const options = { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        };

        return newDate.toLocaleDateString('en-US', options);
    };

    if(!values) return <h1>Loading...</h1>

    return (reviews && 
        <section>
            
            <h1>Average Rating: {reviews.length === 1 ? reviews[0]?.rating : (reviews.reduce((sum, review) => {
                return sum + review.rating
                }, 0)/reviews.length).toFixed(1)}
            </h1>
            {reviews.map((review) => (
               <div key={review?.id}>
                    <span>
                        {review?.review}
                        <br />
                        Rating: {review?.rating}
                        <br />
                        Review posted on: {getDate(review?.created_at)}
                        <br />
                        {/* Author: {review.user_id} */}
                    </span>
                    <br />
                    {sessionUser && sessionUser.id === review?.user_id &&
                    <>
                        <EditReviewButton review={review}/>
                        <DeleteReviewButton review={review}/>
                    </>
                    }
                </div>
            ))}
        </section>
    )
}

export default ProductReviews;