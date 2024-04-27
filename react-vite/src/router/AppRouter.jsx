import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage";
import ProductDetails from "../components/ProductDetails";
import ProductReviews from "../components/ProductReviews";
// import CreateProduct from "../components/CreateProduct";
// import CreateReview from "../components/CreateReview";
import UserProducts from "../components/UserProducts";
import EditProduct from "../components/EditProduct"
import Checkout from '../components/Checkout';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "reviews/:productId",
        element: <ProductReviews />
      },
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
      {
        path: "products/:id/edit",
        element: <EditProduct />,
      },
      // {
      //   path: "reviews/:id/edit",
      //   element: <UpdateReview />,
      // },
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
