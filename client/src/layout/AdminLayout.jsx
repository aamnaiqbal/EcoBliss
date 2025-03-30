import React from "react";
import { useState } from "react";
import { FaTimes, FaHome, FaBars, FaUserTie, FaLeaf } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { PiMoneyFill, PiPathBold } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div>
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
                  to="/admin/dashboard"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <FaHome /> {isSidebarOpen && "Dashboard"}
                </Link>
                <hr />
              </li>
              <li>
                <Link
                  to="/admin/customers"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <IoIosPeople /> {isSidebarOpen && "Customers"}
                </Link>
                <hr />
              </li>
              <li>
                <Link
                  to="/admin/vendors"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <FaUserTie />
                  {isSidebarOpen && "Vendors"}
                </Link>
                <hr />
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <FaLeaf />
                  {isSidebarOpen && "Products"}
                </Link>
                <hr />
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <PiPathBold />
                  {isSidebarOpen && "Order Management"}
                </Link>
                <hr />
              </li>

              <li>
                <Link
                  to="/vendor/payments"
                  className="flex items-center gap-3 p-3 hover:bg-green-100 rounded-lg"
                >
                  <PiMoneyFill />
                  {isSidebarOpen && "Payments"}
                </Link>
                <hr />
              </li>
              <li>
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
              </li>
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
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Vendor Dashboard</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Vendor!</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </div>
          </header>

          {/* Page Content (Injected via Outlet) */}
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
