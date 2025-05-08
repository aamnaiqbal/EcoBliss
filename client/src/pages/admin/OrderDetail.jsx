import React, { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrderShipmentRequest,
  fetchOrders,
} from "../../redux/slices/AdminOrderSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const AdminOrderDetail = () => {
  const location = useLocation();
  const [vehicleType, setVehicleType] = useState("Delivery Bike");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId, subOrderId } = useParams();
  // console.log(orderId, subOrderId)
  const order = useSelector((state) =>
    state.adminOrders.orders.find(
      (o) => o.orderId === orderId && o.subOrderId === subOrderId
    )
  );

  console.log(order);

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrders({ filter: "All" }));
    }
  }, [dispatch, order]);

  const renderVehicleCard = (
    label,
    image,
    greyImage,
    value,
    textColor,
    isSuzuki
  ) => {
    const isDisabled =
      order?.status === "Shipped" || order?.status === "Delivered";
    const isSelected = isDisabled
      ? order?.vehicleType === value
      : vehicleType === value;

    const baseClasses =
      "border-2 p-4 flex flex-col items-center justify-center rounded-3xl";

    const borderClass = isDisabled
      ? isSelected
        ? "border-grey cursor-not-allowed"
        : "border-grey cursor-not-allowed opacity-50"
      : isSelected
      ? "border-grey hover:cursor-pointer"
      : "border-lightGreen hover:cursor-pointer hover:border-grey";

    const bgClass =
      isDisabled && isSuzuki ? "bg-grey" : isSuzuki ? "bg-lightGreen" : "";

    const textClass = isDisabled
      ? isSuzuki
        ? "text-white"
        : "text-grey"
      : textColor;

    return (
      <div
        className={`${baseClasses} ${borderClass} ${bgClass}`}
        onClick={!isDisabled ? () => setVehicleType(value) : undefined}
      >
        <img src={isDisabled ? greyImage : image} alt={label} />
        <p className={`poppins ${textClass} font-semibold text-xl`}>{label}</p>
      </div>
    );
  };

  return (
    <div className="py-16 px-8">
      <div className="bg-white p-8 rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <PiUserCircleDuotone className="text-[5.5rem]" />
            <h4 className="petrona font-semibold text-lightGreen text-xl md:text-3xl md:text-2xl">
              {order?.vendor.nurseryName}
            </h4>
          </div>
          <div>
            <p className="poppins text-lightGrey text-md ">
              Order # {order?.subOrderId}
            </p>
            <p
              className={`poppins text-md  ${
                order?.paymentStatus == "Pending"
                  ? "text-red italic"
                  : "text-green"
              }`}
            >
              Payment {order?.paymentStatus}
            </p>
          </div>
        </div>
        <p className="poppins text-lightGrey text-lg mt-4">
          Shipment request received on: {order?.shipmentRequestedAt}
        </p>
        {order?.shipmentAcceptedAt && (
          <p className="poppins text-lightGreen text-lg mt-4">
            Shipment request accepted on: {order?.shipmentAcceptedAt}
          </p>
        )}
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
            {order?.items.map((item, i) => (
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
        <div className="p-2 mt-4">
          <div className="flex justify-between ">
            <p className="font-semibold  text-md md:text-lg text-lightGrey">
              Total Items
            </p>
            <p className="font-semibold  text-md md:text-lg text-grey">
              {order?.totalItems}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold  text-md md:text-lg text-lightGrey">
              Total Cost
            </p>
            <p className="font-semibold  text-md md:text-lg text-grey">
              Rs. {order?.totalAmount}
            </p>
          </div>
        </div>
        <h3 className="my-4 poppins text-black font-bold underline">
          Vendor Details
        </h3>
        <div className="p-2 ">
          <div className="flex justify-between ">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Name
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.vendor.fullName}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Address
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.vendor.nurseryAddress}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Phone Number
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.vendor.phoneNo}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Email Address
            </p>
            <p className="text-md md:text-lg text-black">
              {order?.vendor.email}
            </p>
          </div>
        </div>
        <h3 className="my-4 poppins text-black font-bold underline">
          Choose Vehicle
        </h3>

        {(order?.status === "Shipped" || order?.status === "Delivered") &&
          order?.vehicleType && (
            <p className="text-lg font-semibold text-grey mb-4">
              Selected Vehicle Type: {order.vehicleType}
            </p>
          )}

        <div className="flex justify-between p-4">
          {renderVehicleCard(
            "Delivery Bike",
            "/images/admin/order/Bike.png",
            "/images/admin/order/greyBike.png",
            "Delivery Bike",
            "text-lightGreen",
            false
          )}
          {renderVehicleCard(
            "Suzuki",
            "/images/admin/order/Suzuki.png",
            "/images/admin/order/Suzuki.png",
            "Suzuki",
            "text-white",
            true // indicates this is the Suzuki card
          )}
          {renderVehicleCard(
            "Truck",
            "/images/admin/order/Truck.png",
            "/images/admin/order/greyTruck.png",
            "Truck",
            "text-lightGreen",
            false
          )}
        </div>

        <div className="flex justify-evenly gap-8 my-4">
          <button
            className="w-1/4 mt-4 bg-[#D9D9D9] hover:bg-lightGreen text-lightGreen hover:text-white text-lg md:text-xl py-3 rounded-xl font-semibold p-2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button
            className={`${
              order?.status === "Shipped" || order?.status === "Delivered"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-lightGreen hover:bg-[#D9D9D9] text-white hover:text-lightGreen"
            } w-1/4 mt-4 text-lg md:text-xl py-3 rounded-xl font-semibold p-2`}
            disabled={
              order?.status === "Shipped" || order?.status === "Delivered"
            }
            onClick={() =>
              dispatch(
                updateOrderShipmentRequest({
                  orderId: order?.orderId,
                  subOrderId: order?.subOrderId,
                  vehicleType,
                })
              )
            }
          >
            Set as Accepted
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
