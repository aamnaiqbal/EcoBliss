import React, { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/AdminOrderSlice";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const AdminOrder = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Ready to ship", "Delivered"];
  const { orders, error, status } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ filter }));
  }, [dispatch, filter]);
  console.log(orders);
  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center py-8">
        {filters.map((statusText) => (
          <button
            key={statusText}
            className={`px-4 py-2 rounded transition-all duration-200 marcellus font-medium ${
              filter === statusText
                ? "text-white  bg-lightGreen"
                : "text-black bg-white"
            }`}
            disabled={status === "loading"}
            onClick={() => setFilter(statusText)}
          >
            {statusText} Orders
          </button>
        ))}
      </div>

      {/* LOADING STATE */}
      {status === "loading" && (
        <p className="text-center text-blue-600 font-medium text-lg my-10">
          Loading orders...
        </p>
      )}

      {/* ERROR STATE */}
      {status === "failed" && (
        <p className="text-center text-red-500 font-medium text-lg my-10">
          Error fetching orders. Please try again.
        </p>
      )}

      {/* ORDERS */}
      {status === "succeeded" && orders.length === 0 && (
        <p className="text-center text-blue-600 font-medium text-xl my-10">
          No orders found.
        </p>
      )}

      <div className="flex flex-wrap justify-center">
        {orders.map((order) => (
          <div
            className="bg-white my-8 mx-8 p-8 rounded-xl"
            key={order.subOrderId}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <div className="">
                  <PiUserCircleDuotone className="text-[3.5rem]" />
                </div>
                <div>
                  <h4 className="petrona font-semibold text-lightGreen text:xl md:text-2xl">
                    {order.vendor.nurseryName}
                  </h4>
                  <p className="poppins text-lightGrey text-md ">
                    Order # {order.orderId}
                  </p>
                </div>
              </div>
              {order?.status == "Shipped" && (
                <div className="bg-lightGreen p-3  text-white rounded-full">
                  <FaCheck />
                </div>
              )}
            </div>
            <p className="poppins text-lightGrey text-lg mt-4">
              Request received on: {order.shipmentRequestedAt}
            </p>
            <hr />
            <table className="w-full poppins">
              <thead>
                <tr className="text-grey text-lg">
                  <td className="p-2">Items</td>
                  <td className="text-center p-2">Qty</td>
                  <td className="text-center p-2">Size</td>
                  <td className="text-right p-2">Price</td>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr className="text-black">
                    <td className="p-2">{item.productDetails.name}</td>
                    <td className="text-center p-2">{item.quantity}</td>
                    <td className="text-center p-2">{item.size}</td>
                    <td className="text-right p-2">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-semibold  text-md md:text-lg text-lightGrey">
                  Total Items
                </p>
                <p className="font-semibold  text-md md:text-lg text-grey">
                  {order.totalItems}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold  text-md md:text-lg text-lightGrey">
                  Total Cost
                </p>
                <p className="font-semibold  text-md md:text-lg text-grey">
                  Rs. {order.totalAmount}
                </p>
              </div>
            </div>
            <Link to={`detail/${order.orderId}/${order.subOrderId}`}>
              <button className="w-full mt-4 bg-lightGreen hover:bg-lightestGreen text-white py-2 rounded-xl font-semibold p-2">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrder;
