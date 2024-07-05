import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserProducts, clearAllProducts } from '../../redux/products';
import ProductDetail from '../LandingPage/ProductDetail';
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

    return () => {
      dispatch(clearAllProducts());
    };
  }, [dispatch, sessionUser, navigate]);

  if (!userProducts || userProducts.products === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="user-products-page">
      <div className="header">
        <h1>My Products</h1>
        <Link to="/products/new" className="btn confirm-btn">
          Create New Product
        </Link>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductDetail key={product?.id} product={product} currentUser={true} />
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
