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
        return null;
      }

      dispatch(createNewProducts(newProduct));

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const imageResponse = await fetch(`/api/products/images/${newProduct.id}`, {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          console.error('Error adding product image:', errorData);
        }
      }

      return newProduct;
    } else {
      const errorData = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorData}`);
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
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
