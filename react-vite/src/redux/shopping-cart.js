const ADD_PRODUCT_TO_CART = 'cart/addProductToCart';
const INCREASE_QUANTITY = 'cart/increaseQuantity';
const DECREASE_QUANTITY = 'cart/decreaseQuantity';

// Actions
export const addToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
});

export const increaseQuantityOnProduct = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
});

export const decreaseQuantityOnProduct = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

// Functions
export const addProductToCart = (product) => (dispatch) => {
  const { id, name, price, images } = product;

  const item = {
    id,
    name,
    price,
    image: images[0].image_url,
  };

  dispatch(addToCart([item]));
};

const initialState = { cart: null, totalPrice: 0 };

// Reducer
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const cart = { ...state.cart };
      const product = action.payload[0];

      if (cart.hasOwnProperty(product.id)) {
        cart[product.id].quantity++;
      } else {
        cart[product.id] = { ...product, quantity: 1 };
      }

      return { cart, totalPrice: state.totalPrice + product.price };
    }

    case INCREASE_QUANTITY: {
      const productId = action.payload;
      const cart = { ...state.cart };

      if (cart.hasOwnProperty(productId)) {
        cart[productId].quantity++;
        return { ...state, cart, totalPrice: state.totalPrice + cart[productId].price };
      }
      return state;
    }

    case DECREASE_QUANTITY: {
      const productId = action.payload;
      const cart = { ...state.cart };
      if (cart.hasOwnProperty(productId) && cart[productId].quantity > 1) {
        cart[productId].quantity--;
        return { ...state, cart, totalPrice: state.totalPrice - cart[productId].price };
      } else if (cart.hasOwnProperty(productId) && cart[productId].quantity === 1) {
        // Remove the product if the quantity becomes 0
        const removedProduct = cart[productId];
        const updatedCart = { ...cart };
        delete updatedCart[productId];
        return {
          ...state,
          cart: updatedCart,
          totalPrice: state.totalPrice - removedProduct.price,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default cartReducer;
