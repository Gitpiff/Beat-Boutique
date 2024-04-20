import { useEffect } from 'react';
import { getAllProducts } from '../../redux/products';
import { useDispatch } from 'react-redux';

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  });
  return (
    <>
      <h1>Welcome Home</h1>
    </>
  );
};

export default LandingPage;
