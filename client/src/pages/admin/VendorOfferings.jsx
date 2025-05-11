import React, { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrderShipmentRequest,
  fetchOrders,
} from "../../redux/slices/AdminOrderSlice";
import { fetchPlants } from "../../redux/slices/VendorPlantSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const VendorOfferings = () => {
  const { plants, status } = useSelector((state) => state.vendorPlants);
  const dispatch = useDispatch();
  const vendorId = "67f2b13622bf153d5a66f23e";
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlants(vendorId));
    }
  }, [dispatch, status]);

  console.log(plants);
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

  return (
    <div className="pt-28 pb-8 px-8">
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
        <h3 className="my-4 poppins text-black font-bold underline">
          Vendor Offerings
        </h3>
        <table className="w-full poppins table-fixed">
          <thead>
            <tr className="text-grey text-lg">
              <th className="text-left w-1/2 p-2">Items</th>
              <th className="w-2/6 text-center p-2">Item ID</th>
              <th className="w-2/6 text-center p-2">Stock</th>
              <th className="w-2/6 text-center p-2">Sizes</th>
              <th className="w-1/6 text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {plants?.map((item, i) => (
              <tr className="text-black" key={i}>
                <td className="p-2">{item.name}</td>
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
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Items Sold
            </p>
            <p className="text-md md:text-lg text-black">46</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Total Income
            </p>
            <p className="text-md md:text-lg text-black">Rs. 45,764</p>
          </div>
        </div>

        <div className="flex justify-evenly gap-8 my-4">
          <button className="w-1/2 mt-4 bg-red  text-white text-lg md:text-xl py-3 rounded-xl font-semibold p-2">
            Delete Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorOfferings;
