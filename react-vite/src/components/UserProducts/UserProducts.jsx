import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserProducts, deleteProductById } from "../../redux/products";
import './UserProducts.css';

const UserProducts = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUserProducts());
    }
  }, [dispatch, sessionUser]);

  const handleDelete = (productId) => {
    dispatch(deleteProductById(productId));
  };

  return (
    <div className="user-products-page">
      <div className="header">
        <h1>My Products</h1>
        <Link to="/products/new" className="create-product-button">
          Create New Product
        </Link>
      </div>
      <div className="product-grid">
        {userProducts.map((product) => (
          <div key={product.id} className="product-tile">
            <Link to={`/products/${product.id}`}>
              {product.images && product.images.length > 0 && (
                <img src={product.images[0].image_url} alt={product.name} />
              )}
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </Link>
            <div className="product-actions">
              <Link to={`/products/${product.id}/edit`} className="edit-button">
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
