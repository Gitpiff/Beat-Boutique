const GET_PRODUCTS = 'products/getProducts';
const GET_PRODUCTS_BY_ID = 'products/getProductById';
const CREATE_NEW_PRODUCT = 'products/createNewProduct';
const UPDATE_PRODUCTS_BY_ID = 'products/updateProductsById';
const DELETE_PRODUCT_BY_ID = 'products/deleteProductById';

// Actions
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

const getProductsById = (product) => ({
  type: GET_PRODUCTS_BY_ID,
  payload: product,
});

const createNewProducts = (product) => ({
  type: CREATE_NEW_PRODUCT,
  payload: product,
});

const updateProductsById = (id) => ({
  type: UPDATE_PRODUCTS_BY_ID,
  payload: id,
});

const deleteProductsById = (id) => ({
  type: DELETE_PRODUCT_BY_ID,
  payload: id,
});

// Thunk functions
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch('/api/products/');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;

    dispatch(getProducts(data));
  }
};

export const getProductById = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;

    dispatch(getProductsById(data));
  }
};

export const createNewProduct = (product) => async (dispatch) => {
  const { name, description, price, inventory } = product;

  const response = await fetch('/api/products/', {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      price,
      inventory,
      image_url,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.errors) return;

    dispatch(createNewProducts(data));

    await fetch(`/api/products/images/${data.id}`, {
      method: 'POST',
      body: JSON.stringify({
        image_url,
      }),
    });
  }
};

export const updateProductById = (id, product) => async (dispatch) => {
  const { name, description, price, inventory } = product;

  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      description,
      price,
      inventory,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    if (data.errors) return;

    dispatch(updateProductsById(id));
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();

    if (data.errors) return;

    dispatch(deleteProductsById(id));

    await fetch(`/api/products/images/${id}`, {
      method: 'DELETE',
    });
  }
};

// Reducer
const initialState = { products: null };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      const products = {};

      action.payload.forEach((product) => {
        products[product.id] = product;
      });

      return products;
    }
    case GET_PRODUCTS_BY_ID: {
      return { [action.payload.id]: action.payload };
    }
    case CREATE_NEW_PRODUCT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case UPDATE_PRODUCTS_BY_ID: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_PRODUCT_BY_ID: {
      const products = { ...state };
      delete products[action.payload];
      return products;
    }
    default:
      return state;
  }
}

export default productReducer;
