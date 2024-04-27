import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { createNewReview } from "../../redux/reviews";
import './ProductReviews.css'
import { useParams } from "react-router-dom";

export default function CreateReviewModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');
    const { productId } = useParams();
    

    useEffect(() => {
        const errs = {};

        if (review && review.length < 10) errs.review = 'Review must be 10 characters at minimum';
        if (review.length > 500) errs.review = 'Review must be 500 characters at maximum';
        if (stars === 0) errs.stars = 'Star rating must be between 1 and 5';

        setErrors(errs)
    }, [review, stars]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const reviewPayload = {
            review, 
            rating: stars
        }

        console.log(reviewPayload);

        return dispatch(createNewReview(productId, reviewPayload))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json()
                if(data && data.errors) {
                    setErrors(data.errors)
                }
            })
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
            
                {errors.review && <span>{errors.review}</span>}
                {errors.stars && <span>{errors.stars}</span>}

                <textarea 
                    placeholder="Leave your review here.." 
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
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