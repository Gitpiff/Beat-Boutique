import { createBrowserRouter, RouterProvider } from 'react-router-dom';import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProductDetails from '../components/ProductDetails';
import CreateProduct from '../components/CreateProduct';
import CreateReview from '../components/CreateReview';
import ManageProducts from '../components/ManageProducts';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />
      },
      {
        path: "products/current",
        element: <ManageProducts />
      },
      {
        path: "products/new",
        element: <CreateProduct />
      },
      {
        path: "review/new",
        element: <CreateReview />
      }
    ],
  },
]);

//Do we need one for updating and/or deleting a product or a review?

// {
//   path: "products/:id/edit",
//   element: <UpdateProduct />,
// },
// {
//   path: "products/:id/delete",
//   element: <DeleteProduct />,
// },
// {
//   path: "reviews/:id/edit",
//   element: <UpdateReview />,
// },
// {
//   path: "reviews/:id/delete",
//   element: <DeleteReview />,
// },


function App() {
  return <RouterProvider router={router} />;
}

export default App;
