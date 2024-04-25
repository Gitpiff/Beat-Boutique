import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductReview } from "../../redux/reviews";

const ProductReviews = () => {
    const dispatch = useDispatch();

    // Get Product Id
    const { productId } = useParams();
    
     // Get reviews
     const reviews = Object.values(useSelector(state => state.reviews));
     console.log(`Reviews : ${reviews}`)

      // Get session user
    //const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getProductReview(productId))
    }, [dispatch, productId])

    return (
        <>
            {reviews && reviews.map((review) => {
                <li key={review.id}>
                    <h3>Yooo</h3>
                    <span>
                        {reviews.review}
                    </span>
                </li>
            })}
        </>
    )
}

export default ProductReviews;