import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import OutdoorPlant from "../pages/categories/OutdoorPlant";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";
import OrchidPlant from "../pages/categories/OrchidPlant";
import HousePlant from "../pages/categories/HousePlant";
import PlantCare from "../pages/categories/PlantCare";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Index from "../layout/Index";
import Checkout from "../pages/checkout/Checkout";
import AboutUs from "../pages/aboutus/AboutUs";
import OrderMessage from "../pages/checkout/OrderMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/HousePlants",
            element: <HousePlant />,
          },
          {
            path: "/Outdoor",
            element: <OutdoorPlant />,
          },
          {
            path: "/Orchid",
            element: <OrchidPlant />,
          },
          {
            path: "/plantcare",
            element: <PlantCare />,
          },
          {
            path: "/HousePlants/:id",
            element: <ProductDetails />,
          },
          {
            path: "/Outdoor/:id",
            element: <ProductDetails />,
          },
          {
            path: "/Orchid/:id",
            element: <ProductDetails />,
          },

          {
            path: "/plantcare/:id",
            element: <ProductDetails />,
          },
  
          {
            path: "/popularplant/:id",
            element: <ProductDetails />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/checkout/message",
            element: <OrderMessage/>
          },
          {
            path: "/about",
            element: <AboutUs />,
          },
        ],
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
