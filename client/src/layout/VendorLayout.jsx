import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./VendorLayout.module.css";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { vendorLogout } from "../redux/slices/AuthSlice";

const VendorLayout = () => {
  const vendorAuth = useSelector((state) => state.auth.vendorAuth);
  console.log(vendorAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openProductMenu, setOpenProductMenu] = useState(null);
  const [openSettingMenu, setOpenSettingMenu] = useState(null);
  const toggleProductMenu = (menu) => {
    if (!isSidebarOpen) return;
    setOpenProductMenu(openProductMenu === menu ? null : menu);
  };

  const toggleSettingMenu = (menu) => {
    if (!isSidebarOpen) return;
    setOpenSettingMenu(openSettingMenu === menu ? null : menu);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setOpenProductMenu(null);
      setOpenSettingMenu(null);
    }
  }, [isSidebarOpen]);

  const routeTitles = {
    "/vendor/orders": {
      title: "Order Management",
      description: "Manage your orders here",
    },
    "/vendor/products/add": {
      title: "Add Product",
      description: "Add your new product here",
    },
    "/vendor/products/view": {
      title: "View My Products",
      description: "View your product listings here",
    },
    "/vendor/products/update": {
      title: "Update Product",
      description: "Update your product details",
    },
    "/vendor/dashboard": {
      title: "Welcome Vendor",
      description: "Here is your vendor dashboard.",
    },
    "/vendor/orders/summary/:orderId/:subOrderId": {
      title: "Order Summary",
      description: "Summary of your specific order",
    },
    "/vendor/orders/detail/:orderId/:subOrderId": {
      title: "Order Details",
      description: "Details of your specific order",
    },
    "/vendor/products/details/:id": {
      title: "Product Details",
      description: "Edit or Delete your product details",
    },
  };
  const location = useLocation();
  const currentPath = location.pathname;
  // const currentRoute = routeTitles[currentPath];
  const currentRoute = Object.entries(routeTitles).find(([path]) =>
    new RegExp("^" + path.replace(/:\w+/g, "[^/]+") + "$").test(currentPath)
  )?.[1] || { title: "", description: "" };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-green shadow-lg h-full marcellus fixed top-0 left-0 overflow-hidden ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all p-4`}
      >
        <div>
          <button
            className="p-3 text-gray-600 text-white "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
          <div className="h-16">
            {isSidebarOpen && (
              <img
                src="/images/Logo.png"
                alt="EcoBliss"
                className="px-4 h-16"
              />
            )}
            <hr />
          </div>
        </div>

        <nav className="mt-8  text-white">
          <ul className="space-y-1">
            <li>
              <Link
                to="/vendor/dashboard"
                className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
              >
                <FaHome /> {isSidebarOpen && "Dashboard"}
              </Link>
              <hr />
            </li>
            <li>
              <button
                className="flex items-center justify-between p-3  w-full rounded-lg cursor-pointer"
                onClick={() => toggleProductMenu("products")}
              >
                <div className="flex items-center gap-3  hover:bg-green-100 rounded-lg">
                  <img
                    src="/images/vendor/sidebar/plantIcon.png"
                    alt=""
                    className="h-4"
                  />
                  {isSidebarOpen && "Products"}
                </div>
                {isSidebarOpen &&
                  (openProductMenu ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  ))}
              </button>
              <hr />
            </li>
            {openProductMenu && (
              <ul className="space-y-1">
                <li className="my-4 ">
                  <Link to="/vendor/products/view" className="ml-8 px-3">
                    View my products
                  </Link>
                  <hr />
                </li>
                <li className="my-4">
                  <Link to="/vendor/products/add" className="ml-8 px-3">
                    Add new product
                  </Link>
                  <hr />
                </li>
              </ul>
            )}
            <li>
              <Link
                to="/vendor/orders"
                className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
              >
                <img
                  src="/images/vendor/sidebar/orderIcon.png"
                  alt=""
                  className="h-4"
                />
                {isSidebarOpen && "Orders"}
              </Link>
              <hr />
            </li>
            <li>
              <Link
                to="/vendor/review&ratings"
                className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
              >
                <img
                  src="/images/vendor/sidebar/ratingIcon.png"
                  alt=""
                  className="h-4"
                />
                {isSidebarOpen && "Reviews and Ratings"}
              </Link>
              <hr />
            </li>
            <li>
              <Link
                to="/vendor/messages"
                className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
              >
                <img
                  src="/images/vendor/sidebar/messagesIcon.png"
                  alt=""
                  className="h-4"
                />
                {isSidebarOpen && "Messages"}
              </Link>
              <hr />
            </li>
            <li>
              <button
                className="flex items-center justify-between p-3  w-full rounded-lg cursor-pointer"
                onClick={() => toggleSettingMenu("settings")}
              >
                <div className="flex items-center gap-3  hover:bg-green-100 rounded-lg">
                  <img
                    src="/images/vendor/sidebar/settingIcon.png"
                    alt=""
                    className="h-4"
                  />
                  {isSidebarOpen && "Settings"}
                </div>
                {isSidebarOpen &&
                  (openSettingMenu ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  ))}
              </button>
              <hr />
            </li>
            {openSettingMenu && (
              <ul className="space-y-1">
                <li className="my-4 ">
                  <Link to="/vendor/settings/account" className="ml-8 px-3">
                    Account Settings
                  </Link>
                  <hr />
                </li>
                <li className="my-4">
                  <Link to="/vendor/settings" className="ml-8 px-3">
                    Other Settings
                  </Link>
                  <hr />
                </li>
              </ul>
            )}
            {/* <li>
              <Link
                to="/vendor/profile"
                className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
              >
                <FaUser /> {isSidebarOpen && "Profile"}
              </Link>
              <hr />
            </li> */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } relative`}
      >
        {/* Header */}
        <header
          className={`bg-white shadow-md p-4 flex justify-between items-center fixed top-0 right-0 z-20 ${
            isSidebarOpen ? "left-64" : "left-20"
          }`}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-3xl font-semibold petrona">
              {currentRoute.title}
            </h2>
            <h2 className="text-sm font-semibold marcellus">
              {currentRoute.description}
            </h2>
          </div>
          <div className="flex items-center flex-end ">
            <button
              className=" text-black px-4 py-2 font-semibold text-md"
              onClick={() => {
                dispatch(vendorLogout());
                navigate("/vendor/login");
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content (Injected via Outlet) */}
        <div className={styles.backgroundContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
