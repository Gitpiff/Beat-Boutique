import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserProducts } from '../../redux/products';
import DeleteProductButton from '../DeleteProduct/DeleteProductButton';
import './UserProducts.css';

const UserProducts = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products);
  const sessionUser = useSelector((state) => state.session.user);
  const products = Object.values(userProducts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionUser) navigate('/');

    dispatch(fetchUserProducts());
  }, [dispatch, sessionUser, navigate]);

  if (!userProducts || userProducts === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="user-products-page">
      <div className="header">
        <h1>My Products</h1>
        <Link to="/products/new" className="create-product-button">
          Create New Product
        </Link>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product?.id} className="product-tile">
            <Link to={`/products/${product?.id}`}>
              {product?.images && product?.images.length > 0 && (
                <img src={product.images[0]?.image_url} alt={product?.name} />
              )}
              <div className="product-details">
                <h3>{product?.name}</h3>
                <p>{product?.description}</p>
                <p>Price: ${product?.price}</p>
              </div>
            </Link>
            <div className="product-actions">
              <Link to={`/products/${product?.id}/edit`} className="edit-button">
                Edit
              </Link>
              <DeleteProductButton product={product?.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
