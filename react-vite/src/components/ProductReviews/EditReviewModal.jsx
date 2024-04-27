import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductReview } from "../../redux/reviews";
import { useModal } from "../../context/Modal";

export default function EditReviewModal({review}) {
    const dispatch = useDispatch();
    console.log(review);
    const { closeModal } = useModal();

    const [stars, setStars] = useState(review.rating);
    const [newReview, setNewReview] = useState(review.review);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errs = {};

        // if (newReview && newReview.length < 10) errs.newReview = 'Review must be 10 characters at minimum';
        // if (newReview.length > 500) errs.newReview = 'Review must be 500 characters at maximum';
        // if (stars === 0) errs.stars = 'Star rating must be between 1 and 5';

        setErrors(errs);

        // dispatch(getProductReview(1))
        
    }, [dispatch, stars, review, review.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedReview = {
            rating: stars,
            review: newReview
        }

        dispatch(updateProductReview(review.id, updatedReview))
        .then(closeModal)
        .catch(async (response) => {
            const data = await response.json();
            if(!data) setErrors(data.errors)
        })
        
        // return navigate(`/products/${review.product_id}`)

    }

    // if(!newReview) return <h1>Loading...</h1>
    return (
        <section>
        <form onSubmit={handleSubmit}>
            <h1>Changed your mind? </h1>
            {errors.review && <span>{errors.review}</span>}
            {errors.stars && <span>{errors.stars}</span>}

            <textarea 
                placeholder="Leave your new review here.." 
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                cols="77" 
                rows="10"
            />

            <div>
                {[...Array(5)].map((stars, index) => {
                    index += 1;
                    return (
                        <>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button
                                key={index}
                                className={index <= (hover || stars) ? 'star yellow' : 'star'}
                                onClick={() => setStars(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(stars)}
                            >
                                &#9734;
                            </button>
                        </div>
                        
                        </>
                    );
                })} 
            </div>

        </form>
    </section>
    )

}