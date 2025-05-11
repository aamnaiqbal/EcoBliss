import React, { useEffect } from "react";
import { fetchVendorOrders } from "../../redux/slices/vendorOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const { orders, status, error } = useSelector((state) => state.vendorOrders);
  console.log(orders);
  const { orderId, subOrderId } = useParams();

  const order = useSelector((state) =>
    state.vendorOrders.orders.find((o) => {
      return o._id == orderId && o.subOrders[0]?._id == subOrderId;
    })
  );

  console.log("order summary ", order);

  const calculatePlatformFee = (totalAmount) => {
    if (!totalAmount || isNaN(totalAmount)) return 0;
    return (totalAmount * 15) / 100;
  };

  useEffect(() => {
    if (!order) {
      dispatch(fetchVendorOrders({ vendorId, status: "All" }));
    }
  }, [dispatch, order]);

  if (status === "loading") {
    return (
      <div className="bg-white my-32 mx-8 p-8 rounded-xl">
        <p className="text-center text-blue-600">Loading order summary...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-white my-32 mx-8 p-8 rounded-xl">
        <p className="text-center text-red-500">
          Error fetching order summary. Please try again.
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white my-32 mx-8 p-8 rounded-xl">
        <p className="text-center text-red-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-8 px-8">
      <div className="bg-white p-8 rounded-xl">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-black text-grey font-semibold px-4 py-2 rounded italic"
        >
          <span className="flex items-center gap-1">
            <FaArrowLeft size={24} /> Back
          </span>
        </button>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h3 className="my-4 text-2xl marcellus text-black font-bold">
              Order Summary
            </h3>
            <p className="poppins text-lightGrey text-md ">
              Order # {subOrderId}
            </p>
          </div>
          <div>
            <p
              className={`poppins text-md ${
                order?.subOrders[0].status == "Ready to ship" && "text-green"
              } ${
                order?.subOrders[0].status == "Delivered" && "text-lightGreen"
              }
              ${order?.subOrders[0].status == "Shipped" && "text-grey"}
              ${order?.subOrders[0].status == "Pending" && "text-red italic"}`}
            >
              {order?.subOrders[0].status}
            </p>
          </div>
        </div>
        <h3 className="my-4 poppins text-black font-bold underline">Items</h3>
        <table className="w-full poppins table-fixed">
          <thead>
            <tr className="text-grey text-lg">
              <th className="text-left w-1/2 p-2">Product Name</th>
              <th className="w-2/6 text-center p-2">Product ID</th>
              <th className="w-2/6 text-center p-2">Size</th>
              <th className="w-2/6 text-center p-2">Quantity</th>
              <th className="w-1/6 text-right p-2">Total Cost</th>
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
                <td className="text-center p-2">{item.productDetails._id}</td>
                <td className="text-center p-2">{item.size}</td>
                <td className="text-center p-2">{item.quantity}</td>
                <td className="text-right p-2">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className="flex justify-between p-2 mt-4">
          <p className="font-semibold  text-md md:text-lg text-lightGrey">
            Total
          </p>
          <p className="font-semibold  text-md md:text-lg text-grey">
            Rs. {order?.subOrders[0].totalAmount}
          </p>
        </div>

        <h3 className="my-4 poppins text-black font-bold underline">
          Financial Details
        </h3>
        <div className="p-2 ">
          <div className="flex justify-between ">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Total Amount
            </p>
            <p className="text-md md:text-lg text-black">
              Rs. {order?.subOrders[0].totalAmount}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Platform Fee (15%)
            </p>
            <p className="text-md md:text-lg text-black">
              Rs. {calculatePlatformFee(order?.subOrders[0]?.totalAmount)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Amount to be received
            </p>
            <p className="text-md md:text-lg text-black">
              Rs.
              {order?.subOrders[0].totalAmount -
                calculatePlatformFee(order?.subOrders[0]?.totalAmount)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Amount receiving status
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.subOrders[0].paymentStatus === "Pending" ? "No" : "Yes"}
            </p>
          </div>
        </div>
        <h3 className="my-4 poppins text-black font-bold underline">
          Other Details
        </h3>
        <div className="p-2 ">
          <div className="flex justify-between ">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Order Date
            </p>
            <p className="text-md md:text-lg text-black">
              {new Date(order?.createdAt)
                .toLocaleDateString("en-GB")
                .split("/")
                .join("-")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Vendor Confirmation Date
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.subOrders[0]?.shipmentRequestedAt === null
                ? "-"
                : new Date(order?.subOrders[0]?.shipmentRequestedAt)
                    .toLocaleDateString("en-GB")
                    .split("/")
                    .join("-")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Admin Confirmation Date
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.subOrders[0]?.shipmentAcceptedAt === null
                ? "-"
                : new Date(order?.subOrders[0]?.shipmentAcceptedAt)
                    .toLocaleDateString("en-GB")
                    .split("/")
                    .join("-")}
            </p>
          </div>
          {/* <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Order Shipped Date
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.shippingDetails?.phoneNo}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
