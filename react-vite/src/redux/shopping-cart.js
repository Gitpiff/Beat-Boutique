const ADD_PRODUCT_TO_CART = 'cart/addProductToCart';
const INCREASE_QUANTITY = 'cart/increaseQuantity';
const DECREASE_QUANTITY = 'cart/decreaseQuantity';
const REST_CART = 'cart/restCart';

// Actions
export const addToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
});

export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const restCartItems = () => ({
  type: REST_CART,
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

const initialState = { cart: null, totalPrice: 0, totalItems: 0 };

// Reducer
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const cart = { ...state.cart };
      const product = action.payload[0];

      if (state.totalItems === 0) state.totalItems = 1;
      else state.totalItems++;

      if (cart.hasOwnProperty(product.id)) {
        cart[product.id].quantity++;
      } else {
        cart[product.id] = { ...product, quantity: 1 };
      }

      return {
        cart,
        totalPrice: state.totalPrice + product.price,
        totalItems: state.totalItems,
      };
    }

    case INCREASE_QUANTITY: {
      const productId = action.payload;
      const cart = { ...state.cart };

      if (state.totalItems === 0) state.totalItems = 1;
      else state.totalItems++;

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
        state.totalItems--;
        return {
          ...state,
          cart,
          totalPrice: state.totalPrice - cart[productId].price,
          totalItems: state.totalItems,
        };
      } else if (cart.hasOwnProperty(productId) && cart[productId].quantity === 1) {
        // Remove the product if the quantity becomes 0
        const removedProduct = cart[productId];
        const updatedCart = { ...cart };
        delete updatedCart[productId];
        return {
          ...state,
          cart: updatedCart,
          totalPrice: state.totalPrice - removedProduct.price,
          totalItems: state.totalItems - 1,
        };
      }
      return state;
    }

    case REST_CART: {
      return { cart: null, totalPrice: 0 };
    }
    default:
      return state;
  }
}

export default cartReducer;
