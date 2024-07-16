import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProductDetails from '../components/ProductDetails';
import ProductReviews from '../components/ProductReviews';
import CreateProduct from '../components/CreateProduct';
import UserProducts from '../components/UserProducts';
import EditProduct from '../components/EditProduct';
import Checkout from '../components/Checkout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetails />,
      },
      {
        path: 'reviews/:productId',
        element: <ProductReviews />,
      },
      {
        path: 'products/current',
        element: <UserProducts />,
      },
      {
        path: 'products/new',
        element: <CreateProduct />,
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
