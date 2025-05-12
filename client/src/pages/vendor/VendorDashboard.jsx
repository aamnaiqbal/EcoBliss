import React, { useEffect } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorOrders } from "../../redux/slices/vendorOrderSlice";
import { fetchPlants } from "../../redux/slices/VendorPlantSlice";
import { Link } from "react-router-dom";
import {
  fetchVendorRevenue,
  fetchVendorCustomers,
  fetchTotalVisitors,
} from "../../redux/slices/VendorDashboardSlice";

const VendorDashboard = () => {
  const { orders } = useSelector((state) => state.vendorOrders);
  // console.log(orders);

  const { id } = useSelector((state) => state.auth.vendorAuth);
  const { plants, status, error } = useSelector((state) => state.vendorPlants);
  const vendorId = id;
  // console.log(vendorId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorOrders({ vendorId, status: "All" }));
    }
  }, [dispatch, vendorId]);
  useEffect(() => {
    if (vendorId) {
      dispatch(fetchPlants(vendorId));
    }
  }, [dispatch, vendorId]);

  const pendingOrdersCount =
    orders?.filter((order) => order.subOrders[0].status === "Pending").length ||
    0;
  const readyToShipCount =
    orders?.filter((order) => order.subOrders[0].status === "Ready to ship")
      .length || 0;

  const { totalRevenue, totalOrders, customers, visitors, loading } =
    useSelector((state) => state.vendorDashboard);

  // console.log(totalRevenue, totalOrders, customers, visitors);

  useEffect(() => {
    if (vendorId) dispatch(fetchVendorRevenue(vendorId));
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (vendorId) dispatch(fetchVendorCustomers(vendorId));
  }, [dispatch, vendorId]);

  useEffect(() => {
    dispatch(fetchTotalVisitors());
  }, [dispatch]);

  return (
    <div className="mb-12 mt-28  mx-8 p-8">
      <div className="bg-customWhite my-4 mx-8 p-8 rounded-xl">
        <h3 className="poppins text-black font-semibold text-lg text-center">
          REVENUE DETAILS
        </h3>
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <CiMoneyBill size={24} />
            <p>Revenue</p>
          </div>
          <p>Rs. {totalRevenue || 0}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <FaPerson size={24} />
            <p>Visitors</p>
          </div>
          <p>{visitors || 0}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <FaPerson size={24} />
            <p>Purchasers</p>
          </div>
          <p>{customers || 0}</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <HiShoppingBag size={24} />
            <p>Orders</p>
          </div>
          <p>{totalOrders || 0}</p>
        </div>
        <hr />
        {/* <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <FaPerson size={24} />
            <p>Conversion Rate</p>
          </div>
          <p>67%</p>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <FaPerson size={24} />
            <p>Average Order Value</p>
          </div>
          <p>Rs 1300</p>
        </div>
        <hr /> */}
      </div>
      <div className="bg-customWhite my-8 mx-8 p-8 rounded-xl">
        <h3 className="poppins text-black font-semibold text-lg text-center">
          MY PRODUCTS
        </h3>
        <Link to="/vendor/products/add">
          <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4 cursor-pointer">
            <div className="flex flex-row justify-between items-center gap-x-4">
              <IoIosAddCircle size={24} />
              <p>Add Products</p>
            </div>
            <MdKeyboardArrowRight size={28} />
          </div>
        </Link>
        <hr />
        {/* <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4 cursor-pointer">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <img
              src="/images/vendor/dashboard/product.png"
              alt=""
              className="h-6"
            />
            <p>Live Products</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-4">
            <p>{plants.length || 0}</p>
            <MdKeyboardArrowRight size={28} />
          </div>
        </div> */}
        <hr />
        {/* <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4 cursor-pointer">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <img
              src="/images/vendor/dashboard/outofstock.png"
              alt=""
              className="h-6"
            />
            <p>Out of Stock</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-4">
            <p>67</p>
            <MdKeyboardArrowRight size={28} />
          </div>
        </div> */}
        <hr />
        <Link to={"/vendor/products/view"}>
          <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4 cursor-pointer">
            <div className="flex flex-row justify-between items-center gap-x-4">
              <FaLeaf size={24} />
              <p>View All Products</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-x-4">
              <MdKeyboardArrowRight size={28} />
            </div>
          </div>
        </Link>
        <hr />
      </div>
      <div className="bg-customWhite my-8 mx-8 p-8 rounded-xl">
        <h3 className="poppins text-black font-semibold text-lg text-center">
          KEY METRICS
        </h3>
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4 cursor-pointer">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <img
              src="/images/vendor/dashboard/order.png"
              alt=""
              className="h-6"
            />
            <p>Pending Orders</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-4">
            <p>{pendingOrdersCount}</p>
            <MdKeyboardArrowRight size={28} />
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center text-grey font-semibold text-lg mt-8 mb-4">
          <div className="flex flex-row justify-between items-center gap-x-4">
            <img
              src="/images/vendor/dashboard/truck.png"
              alt=""
              className="h-6"
            />
            <p>Ready To Ship</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-x-4">
            <p>{readyToShipCount}</p>
            <MdKeyboardArrowRight size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
