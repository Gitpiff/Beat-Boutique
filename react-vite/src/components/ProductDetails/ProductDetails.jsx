import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/products";
import { getProductReview } from "../../redux/reviews";
import ProductReviews from "../ProductReviews";

const ProductDetails = () => {

    const dispatch = useDispatch();

    // Get Product Id
    const { productId } = useParams();
    // console.log(`Product Id: ${productId}`)
    
    // Get product from redux store
    const product = useSelector(state => state.products ? state.products[productId] : null);
    // console.log(`Product : ${product}`)
    // Get session user
    //const sessionUser = useSelector(state => state.session.user);

    // Get reviews
    const reviews = Object.values(useSelector(state => state.reviews));
    // console.log(`Reviews : ${reviews}`)
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
                <div>
                    {/* Conditional rendering of images if they exist */}
                    {product && product.images && product.images.map((image) => (
                        <img style={{width: '400px', height: '500px'}} key={image.id} src={image.image_url} alt={`Product image ${product.name}`} />
                    ))}
                </div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>Quantity Left: {product.inventory}</p>
                <div className='review-preview'>
                    <p>
                        <i className='fas fa-star'></i>
                        <span>&#9733; {product.avgRating !== "undefined" ? `${parseFloat(product.avgRating).toFixed(2)}` : "New"}</span>
                        {console.log(product.avgRating)}
                        {product.numReviews !== 0 && (
                            <span>
                                · {product.reviews && product.reviews.length === 1 ? '1 review' : `${product.reviews.length} reviews`}
                            </span>
                        )}
                    </p>
                </div>
                {/* {(sessionUser && reviews.length === 0 && sessionUser.id !== product.owner_id) && 
                    <>
                        <p>Be The first to post a Review!!</p>
                    </>
                }
                {(sessionUser && reviews.length === 1 && sessionUser.id !== product.owner_id) &&
                    <>
                        <p>1 Review</p>
                    </>
                }
                {sessionUser && product.reviews.length && product.reviews.length > 1 && sessionUser.id !== product.owner_id && 
                    <>
                        <span>&#9733; {product.reviews.length} Reviews</span>
                    </>
                } */}
                <button className="btn">Add To Cart</button>

                <div>
                    <h1>Reviews: </h1>
                    {product.reviews.length >= 1 && <ProductReviews productId={productId} product={product} />
                    }
                </div>
                
              </div>
        </section>
    )
}

export default ProductDetails;