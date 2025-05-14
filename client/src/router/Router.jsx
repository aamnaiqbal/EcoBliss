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
import VendorDashboard from "../pages/vendor/VendorDashboard";
import OrderSummary from "../pages/vendor/OrderSummary";
import VendorOfferings from "../pages/admin/VendorOfferings";
import PaymentReturn from "../pages/checkout/PaymentReturn";
import ResendOTP from "../auth/vendor/ResendOTP";
import ProtectedVendorRoute from "../protected/ProtectedVendorRoute";
import ProtectedAdminRoute from "../protected/ProtectedAdminRoute";
import PageNotFound from "../pages/PageNotFound";
import VendorOfferingDetail from "../pages/admin/VendorOfferingDetail";

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
            path: "/about",
            element: <AboutUs />,
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
            path: "/checkout/message/:orderId",
            element: <OrderMessage />,
          },
          { path: "order/payment-return", element: <PaymentReturn /> },
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
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: "",
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
              {
                path: "vendor/offerings",
                element: <VendorOfferings />,
              },
              {
                path: "vendor/offerings/:vendorId",
                element: <VendorOfferingDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "/vendor",
        element: <ProtectedVendorRoute />,
        children: [
          {
            path: "",
            element: <VendorLayout />,
            children: [
              {
                path: "dashboard",
                element: <VendorDashboard />,
              },
              {
                path: "orders",
                element: <OrdersPage />,
              },
              {
                path: "orders/detail/:orderId/:subOrderId",
                element: <VendorOrderDetail />,
              },
              {
                path: "orders/summary/:orderId/:subOrderId",
                element: <OrderSummary />,
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
                path: "products/details/:plantId",
                element: <ProductDetail />,
              },
            ],
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
        path: "/vendor/resend-otp",
        element: <ResendOTP />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
