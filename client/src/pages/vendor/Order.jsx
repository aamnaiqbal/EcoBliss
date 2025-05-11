import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorOrders,
  updateOrderStatus,
} from "../../redux/slices/vendorOrderSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [filter, setFilter] = useState("All");
  const { orders, status, error } = useSelector((state) => state.vendorOrders);
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const dispatch = useDispatch();
  useEffect(() => {
    // if (status === "idle") {
    dispatch(fetchVendorOrders({ vendorId, status: filter }));
    // }
  }, [dispatch, vendorId, filter]);

  const filters = ["All", "Pending", "Ready to ship", "Delivered"];

  console.log(orders);
  return (
    <>
      <div className="bg-customWhite mb-12 mt-32  mx-8 p-8 rounded-xl">
        {/* FILTER BUTTONS */}
        <div className="flex gap-4 flex-wrap justify-center my-4">
          {filters.map((statusText) => (
            <button
              key={statusText}
              className={`px-4 py-2 rounded transition-all duration-200 marcellus font-medium border-b ${
                filter === statusText
                  ? "text-green  border-green"
                  : "text-gray-700 border-transparent"
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
          {orders.map((order, i) => (
            <div className="bg-white my-16 mx-8 p-8 rounded-xl" key={i}>
              <p className="font-semibold  text-md md:text-lg text-black">
                Order Id:
                <span className="font-semibold  text-md md:text-lg text-grey italic">
                  {order.subOrders[0]._id}
                </span>
              </p>

              <p className="poppins text-lightGrey text-lg mt-4">
                Order received on: {order.createdAtFormatted}
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
                  {order.subOrders[0].items.map((item, i) => (
                    <tr className="text-black" key={i}>
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
                  <p className="font-semibold text-md md:text-lg text-lightGrey">
                    Total Items
                  </p>
                  <p className="font-semibold text-md md:text-lg text-grey">
                    {order.subOrders[0].totalItems}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-md md:text-lg text-lightGrey">
                    Total Cost
                  </p>
                  <p className="font-semibold text-md md:text-lg text-grey">
                    Rs. {order.subOrders[0].totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <Link
                  to={`detail/${order._id}/${order.subOrders[0]._id}`}
                  state={{ order }}
                >
                  <button className="mt-4 bg-lightGreen hover:bg-lightestGreen text-white py-2 rounded-xl font-semibold p-2">
                    See Details
                  </button>
                </Link>
                <button
                  className={`mt-4 ${
                    order?.subOrders[0]?.status !== "Pending"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-lightGreen hover:bg-[#D9D9D9] text-white hover:text-lightGreen"
                  }  py-2 rounded-xl font-semibold p-2`}
                  disabled={order?.subOrders[0]?.status !== "Pending"}
                  onClick={() =>
                    dispatch(
                      updateOrderStatus({
                        vendorId: order?.subOrders[0]?.vendorId,
                        status: "Ready to ship",
                        orderId: order?._id,
                      })
                    )
                  }
                >
                  Set as Ready-to-ship
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
