import React from "react";
import { useState } from "react";
import { FaTimes, FaHome, FaBars, FaUserTie, FaLeaf } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { PiMoneyFill, PiPathBold } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";
import styles from "./VendorLayout.module.css";
import { useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/AuthSlice";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg h-full marcellus fixed top-0 left-0 overflow-hidden ${
            isSidebarOpen ? "w-64" : "w-20"
          } transition-all p-4`}
        >
          <div>
            <button
              className="p-3 text-gray-600 "
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

          <nav className="mt-8  ">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Dashboard"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Dashboard")}
                >
                  <FaHome /> {isSidebarOpen && "Dashboard"}
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/admin/customers"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Customers"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Customers")}
                >
                  <IoIosPeople /> {isSidebarOpen && "Customers"}
                </Link>
              </li> */}
              <li>
                <Link
                  to="/admin/vendor/offerings"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Vendors"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Vendors")}
                >
                  <FaUserTie />
                  {isSidebarOpen && "Vendors"}
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/admin/products"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Products"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Products")}
                >
                  <FaLeaf />
                  {isSidebarOpen && "Products"}
                </Link>
              </li> */}
              <li>
                <Link
                  to="/admin/orders"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Order Management"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Order Management")}
                >
                  <PiPathBold />
                  {isSidebarOpen && "Order Management"}
                </Link>
              </li>

              {/* <li>
                <Link
                  to="/vendor/payments"
                  className={`flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg ${
                    selectedTab === "Payments"
                      ? "text-white bg-lightGreen"
                      : "text-grey"
                  }`}
                  onClick={() => setSelectedTab("Payments")}
                >
                  <PiMoneyFill />
                  {isSidebarOpen && "Payments"}
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/vendor/chats"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <img
                    src="/images/vendor/sidebar/messagesIcon.png"
                    alt=""
                    className="h-4"
                  />
                  {isSidebarOpen && "Chats"}
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
            <h2 className="text-xl font-semibold">Welcome Admin</h2>
            <div className="flex items-center space-x-4">
              <button
                className="text-black px-4 py-2 font-semibold"
                onClick={() => dispatch(adminLogout())}
              >
                Logout
              </button>
            </div>
          </header>

          {/* Page Content (Injected via Outlet) */}
          <div className="bg-[#E1F4EB] min-h-dvh w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
