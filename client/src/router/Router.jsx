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
import VendorSignup from "../auth/vendor/vendorSignUp";
import VendorVerifyOTP from "../auth/vendor/VendorOTP";
import VendorLogin from "../auth/vendor/VendorLogin";
import VendorLayout from "../layout/vendorLayout";
import ViewProducts from "../pages/vendor/Products/ViewProducts";
import ProductDetail from "../pages/vendor/Products/ProductDetail";
import AddProduct from "../pages/vendor/Products/AddProduct";
import OrdersPage from "../pages/vendor/Order";
import AdminLogin from "../auth/admin/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminOrder from "../pages/admin/Order";
import AdminOrderDetail from "../pages/admin/orderDetail";
import VendorOrderDetail from "../pages/vendor/OrderDetail";

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
            element: <OrderMessage />,
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
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "orders",
            element: <AdminOrder />,
          },
          {
            path: "orders/detail/:orderId/:subOrderId",
            element: <AdminOrderDetail />,
          },
        ],
      },
      {
        path: "/vendor",
        element: <VendorLayout />,
        children: [
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "orders/detail/:orderId/:subOrderId",
            element: <VendorOrderDetail />,
          },
          {
            path: "products/view",
            element: <ViewProducts />,
          },
          {
            path: "products/add",
            element: <AddProduct />,
          },
          {
            path: "products/update",
            element: <AddProduct />,
          },
          {
            path: "products/details/:id",
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "/vendor/signup",
        element: <VendorSignup />,
      },
      {
        path: "/vendor/login",
        element: <VendorLogin />,
      },
      {
        path: "/vendor/verify-otp",
        element: <VendorVerifyOTP />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
]);

export default router;
