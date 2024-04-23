import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById  } from "../../redux/products";
import { getProductReview } from "../../redux/reviews";

const ProductPage = () => {

    const dispatch = useDispatch();
    // Get Product Id
    const { productId } = useParams();

    // Get Product from redux store
    const product = useSelector(state => state.products ? state.products[productId] : null);

    // Get Reviews
    const reviews = Object.values(useSelector(state => state.reviews));

    // Get current user
    const currentUser = useSelector(state => state.session.user);
    
    // Get selected Product
    useEffect(() => {
        dispatch(getProductById(productId));

        if(reviews.length) {
            dispatch(getProductReview(productId));
        }
    }, [dispatch, productId, reviews.length])


    return (
        <>
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h2>{product.price}</h2>
            <h3>{product.inventory}</h3>
            <img src={product.image_url} alt={product.name} />
            <div>
                <h4>&#9733;{product.avgRating !== "No reviews found" ? `${parseFloat(product.avgRating).toFixed(2)}`: "New"}</h4>
                {product.numReviews !== 0 && (
                    <span>
                        {product.numReviews && product.numReviews === 1 ? '1 review' : 'reviews'}
                    </span>
                )}
            </div>
            {/* If more than One Review display Reviews instead of Review */}
            {(currentUser && product.numReviews === 0 && currentUser.id !== product.owner_id) &&
            <>
                <button>Be the first to post a review!</button>
            </>
            }

            {/* {()

            } */}

        </>
    )
}

export default ProductPage;