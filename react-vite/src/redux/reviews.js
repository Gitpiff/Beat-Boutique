const GET_REVIEWS_BY_ID = 'reviews/getReviewsById';
const CREATE_NEW_REVIEW = 'reviews/createNewReview';
const UPDATE_PRODUCT_REVIEW = 'reviews/updateProductReview';
const DELETE_PRODUCT_REVIEW = 'reviews/deleteProductReview';

// Actions
const getProductReviews = (review) => ({
  type: GET_REVIEWS_BY_ID,
  payload: review,
});

const createNewReviews = (review) => ({
  type: CREATE_NEW_REVIEW,
  payload: review,
});

const updateProductReviews = (id) => ({
  type: UPDATE_PRODUCT_REVIEW,
  payload: id,
});

const deleteProductReviews = (id) => ({
  type: DELETE_PRODUCT_REVIEW,
  payload: id,
});

//Thunk functions
export const getProductReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;

    dispatch(getProductReviews(data));
  }
};

export const createNewReview = (id, reviews) => async (dispatch) => {
  const { rating, review } = reviews;
  const response = await fetch(`api/reviews/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rating,
      review,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;

    dispatch(createNewReviews(data));
  }
};

export const updateProductReview = (id, reviews) => async (dispatch) => {
  const { rating, review } = reviews;
  const response = await fetch(`api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      rating,
      review,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.errors) return;

    dispatch(updateProductReviews(id));
  }
};

export const deleteProductReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();

    if (data.errors) return;

    dispatch(deleteProductReviews(id));
  }
};

// Reducer
const initialState = { reviews: null };

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS_BY_ID: {
      const reviews = {};
      action.payload.forEach((review) => {
        reviews[review.id] = action.payload;
      });
      return reviews;
    }
    case CREATE_NEW_REVIEW: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case UPDATE_PRODUCT_REVIEW: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_PRODUCT_REVIEW: {
      const reviews = { ...state };
      delete reviews[action.payload];
      return reviews;
    }
    default:
      return state;
  }
}

export default reviewReducer;
