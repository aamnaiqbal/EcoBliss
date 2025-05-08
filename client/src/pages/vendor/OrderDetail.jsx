import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  updateOrderStatus,
  fetchVendorOrders,
} from "../../redux/slices/vendorOrderSlice";

const VendorOrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { order } = location.state;
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const { orderId, subOrderId } = useParams();
  console.log(orderId, subOrderId);

  const order = useSelector((state) =>
    state.vendorOrders.orders.find(
      (o) => o._id == orderId && o.subOrders[0]?._id == subOrderId
    )
  );

  console.log("order detail ", order);

  useEffect(() => {
    if (!order) {
      dispatch(fetchVendorOrders({ vendorId, status: "All" }));
    }
  }, [dispatch, order]);
  if (!order) {
    return (
      <div className="bg-white my-16 mx-8 p-8 rounded-xl">
        <p className="text-center text-red-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <p className="font-semibold  text-md md:text-lg text-black">
          Order Id:
          <span className="font-semibold  text-md md:text-lg text-grey italic">
            {order?.subOrders[0]?._id}
          </span>
        </p>
        <p className="poppins text-lightGrey text-md italic">
          {order?.subOrders[0]?.status}
        </p>
      </div>
      <p className="poppins text-lightGrey text-lg mt-4">
        Order received on: {order?.createdAtFormatted}
      </p>
      <h3 className="my-4 poppins text-black font-bold underline">
        Order Details
      </h3>
      <table className="w-full poppins table-fixed">
        <thead>
          <tr className="text-grey text-lg">
            <th className="text-left w-1/2 p-2">Items</th>
            <th className="w-2/6 text-center p-2">Qty</th>
            <th className="w-2/6 text-center p-2">Size</th>
            <th className="w-1/6 text-right p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {order?.subOrders[0]?.items.map((item, i) => (
            <tr className="text-black" key={i}>
              <td className="p-2">
                <div className="flex flex-row items-center gap-x-2">
                  <img
                    src={item.productDetails.image}
                    className="h-28 w-32 rounded-md"
                  ></img>
                  <p>{item.productDetails.name}</p>
                </div>
              </td>
              <td className="text-center p-2">{item.quantity}</td>
              <td className="text-center p-2">{item.size}</td>
              <td className="text-right p-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="p-2 mt-4">
        <div className="flex justify-between ">
          <p className="font-semibold  text-md md:text-lg text-lightGrey">
            Total Items
          </p>
          <p className="font-semibold  text-md md:text-lg text-grey">
            {order?.subOrders[0]?.totalItems}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold  text-md md:text-lg text-lightGrey">
            Total Cost
          </p>
          <p className="font-semibold  text-md md:text-lg text-grey">
            Rs. {order?.subOrders[0]?.totalAmount}
          </p>
        </div>
      </div>
      <h3 className="my-4 poppins text-black font-bold underline">
        Customer Details
      </h3>
      <div className="p-2 ">
        <div className="flex justify-between ">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Name
          </p>
          <p className="text-md md:text-lg text-black">
            {order?.shippingDetails?.fullName}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Address
          </p>
          <p className="text-md md:text-lg text-black">
            {order?.shippingDetails?.address}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Phone Number
          </p>
          <p className="text-md md:text-lg text-black">
            {order?.shippingDetails?.phoneNo}
          </p>
        </div>
      </div>
      <div className="flex justify-evenly gap-8 my-4">
        <button
          className="w-1/4 mt-4 bg-[#D9D9D9] hover:bg-lightGreen text-lightGreen hover:text-white text-lg md:text-xl py-3 rounded-xl font-semibold p-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        <button
          className={`w-1/4 mt-4 ${
            order?.subOrders[0]?.status !== "Pending"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-lightGreen hover:bg-[#D9D9D9] text-white hover:text-lightGreen"
          } text-lg md:text-xl py-3 rounded-xl font-semibold p-2`}
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
  );
};

export default VendorOrderDetail;
