import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage";
import ProductDetails from "../components/ProductDetails";
// import CreateProduct from "../components/CreateProduct";
// import CreateReview from "../components/CreateReview";
// import UserProducts from "../components/UserProducts";


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
        path: "products/:productId",
        element: <ProductDetails />,
      },
      // {
      //   path: "products/current",
      //   element: <UserProducts />,
      // },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
