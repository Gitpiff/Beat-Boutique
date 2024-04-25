import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
<<<<<<< HEAD
import LandingPage from '../components/LandingPage';
=======
import ProductPage from '../components/ProductPage';
>>>>>>> ff7d478d24f5411bbf9a50a4a9251a0bc9c41eb5

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />
      }
    ],
  },
]);
<<<<<<< HEAD
=======

>>>>>>> ff7d478d24f5411bbf9a50a4a9251a0bc9c41eb5
