const GET_PRODUCTS = 'products/getProducts';
const GET_PRODUCTS_BY_ID = 'products/getProductById';
const GET_USER_PRODUCTS = 'products/getUserProducts';
const CREATE_NEW_PRODUCT = 'products/createNewProduct';
const UPDATE_PRODUCTS_BY_ID = 'products/updateProductsById';
const DELETE_PRODUCT_BY_ID = 'products/deleteProductById';
const CLEAR_PRODUCTS = 'products/clearProducts';

// Actions
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

const getProductsById = (product) => ({
  type: GET_PRODUCTS_BY_ID,
  payload: product,
});

const getUserProducts = (products) => ({
  type: GET_USER_PRODUCTS,
  payload: products,
});

const createNewProducts = (product) => ({
  type: CREATE_NEW_PRODUCT,
  payload: product,
});

const updateProductsById = (product) => ({
  type: UPDATE_PRODUCTS_BY_ID,
  payload: product,
});

const deleteProductsById = (id) => ({
  type: DELETE_PRODUCT_BY_ID,
  payload: id,
});

const clearProducts = () => ({
  type: CLEAR_PRODUCTS,
});

// Thunk functions
export const getAllProducts =
  ({ page, size }) =>
  async (dispatch) => {
    const response = await fetch(`/api/products?page=${page}&page_size=${size}`);
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

export const fetchUserProducts = () => async (dispatch) => {
  const response = await fetch('/api/products/current');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;
    dispatch(getUserProducts(data));
  }
};

export const createNewProduct = (prodData) => async (dispatch) => {
  try {
    let { name, description, price, inventory, type, image } = prodData;
    price = +price;
    inventory = +inventory;

    const response = await fetch('/api/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, inventory, type }),
    });

    if (response.ok) {
      const newProduct = await response.json();
      if (newProduct.errors) {
        console.error('Error creating product:', newProduct.errors);
        return { errors: newProduct.errors };
      }

      dispatch(createNewProducts(newProduct));

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const imageResponse = await fetch(`/api/products/images/${newProduct.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formData,
        });

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          console.error('Error adding product image:', errorData);
          return { errors: errorData.errors };
        }
      }

      return newProduct;
    } else {
      const errorData = await response.json();
      console.error('Error creating product:', errorData);
      return { errors: errorData.errors };
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return { errors: ['An error occurred while creating the product.'] };
  }
};

export const updateProductById = (id, product) => async (dispatch) => {
  const { name, description, type, price, inventory } = product;

  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      type,
      price,
      inventory,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    if (data.errors) {
      console.error('Error updating product:', data.errors);
      return { errors: data.errors };
    }

    dispatch(updateProductsById(data));
    return data;
  } else {
    const errorData = await response.json();
    console.error('Error updating product:', errorData);
    return { errors: errorData.errors };
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
  }
};

export const clearAllProducts = () => async (dispatch) => {
  dispatch(clearProducts());
};

// Reducer
const initialState = {
  products: null,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      const products = {};

      if (state.products === null) {
        action.payload.forEach((product) => {
          products[product.id] = product;
        });
        return products;
      }

      action.payload.forEach((product) => {
        products[product.id] = product;
      });

      return { ...state, ...products };
    }
    case GET_USER_PRODUCTS: {
      const newState = {};
      action.payload.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    }
    case GET_PRODUCTS_BY_ID: {
      return { ...state, [action.payload.id]: action.payload };
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
    case CLEAR_PRODUCTS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default productReducer;
