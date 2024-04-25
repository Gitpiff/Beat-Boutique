import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import UserProducts from "../components/UserProducts";
// import ProductDetails from "../components/ProductDetails";
// import CreateProduct from "../components/CreateProduct";
// import CreateReview from "../components/CreateReview";
// import UserProducts from "../components/UserProducts";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      // {
      //   path: 'products/:id',
      //   element: <ProductDetails />,
      // },
      {
        path: "products/current",
        element: <UserProducts />,
      },
      // {
      //   path: "products/new",
      //   element: <CreateProduct />,
      // },
      // {
      //   path: "review/new",
      //   element: <CreateReview />,
      // },
      // {
      //   path: "products/:id/edit",
      //   element: <UpdateProduct />,
      // },
      // {
      //   path: "reviews/:id/edit",
      //   element: <UpdateReview />,
      // },
      // {
      //   path: 'checkout',
      //   element: <Checkout />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
