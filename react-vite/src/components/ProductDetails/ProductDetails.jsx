import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/products";
import { getProductReview } from "../../redux/reviews";
import ProductReviews from "../ProductReviews";
//import OpenModalButton from "../OpenModalButton/OpenModalButton";
//import CreateReviewModal from "../ProductReviews/CreateReviewModal";
import ReviewButton from "../ProductReviews/ReviewButton";

const ProductDetails = () => {

    const dispatch = useDispatch();

    // Get Product Id
    const { productId } = useParams();
    // console.log(`Product Id: ${productId}`)
    
    // Get product from redux store
    const product = useSelector(state => state.products ? state.products[productId] : null);
    // console.log(`Product : ${product}`)
    // Get session user
    const sessionUser = useSelector(state => state.session.user);

    // Get reviews
    const reviews = Object.values(useSelector((state) => state.reviews));
    const reviewsLength = reviews.length;
    //console.log(`Reviews : ${reviews}`)
    // Get selected product
    useEffect(() => {
        dispatch(getProductById(productId))

        if(reviews.length) {
            dispatch(getProductReview(productId))
        }
    }, [dispatch, productId, reviews.length])


    if(!product) return <h1>Loading...</h1>;
    return ( 
        <section>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    {/* Conditional rendering of images if they exist */}
                    {product && product.images && product.images.map((image) => (
                        <img style={{width: '400px', height: '500px'}} key={image.id} src={image.image_url} alt={`Product image ${product.name}`} />
                    ))}
                </div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>Quantity Left: {product.inventory}</p>
                <div>
                    <ReviewButton productId={productId}  userId={sessionUser.id}/>
                    <button>Add to Cart</button>

                </div>

                    <div>
                        {reviewsLength >= 1 && <ProductReviews productId={productId} product={product} />
                        }
                    </div>
                
              </div>
        </section>
    )
}

export default ProductDetails;