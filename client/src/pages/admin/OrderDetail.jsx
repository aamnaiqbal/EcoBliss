import React from "react";
import { PiUserCircleDuotone } from "react-icons/pi";

const AdminOrderDetail = () => {
  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <PiUserCircleDuotone className="text-[5.5rem]" />
          <h4 className="petrona font-semibold text-lightGreen text-xl md:text-3xl md:text-2xl">
            Green Gardens
          </h4>
        </div>
        <div>
          <p className="poppins text-lightGrey text-md ">Order # 29102</p>
          <p className="poppins text-lightGrey text-md ">Payment Pending</p>
        </div>
      </div>
      <p className="poppins text-lightGrey text-lg mt-4">
        Shipment request received on: Wed, March 12, 2024
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
          <tr className="text-black">
            <td className="p-2">Monstera Delicosa</td>
            <td className="text-center p-2">1</td>
            <td className="text-center p-2">M</td>
            <td className="text-right p-2">3000</td>
          </tr>
          <tr>
            <td className="p-2">Monstera Delicosa</td>
            <td className="text-center p-2">1</td>
            <td className="text-center p-2">S</td>
            <td className="text-right p-2">1000</td>
          </tr>
          <tr>
            <td className="p-2">Great Desert Cactus</td>
            <td className="text-center p-2">1</td>
            <td className="text-center p-2"> L</td>
            <td className="text-right p-2">8000</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="p-2 mt-4">
        <div className="flex justify-between ">
          <p className="font-semibold  text-md md:text-lg text-lightGrey">
            Total Items
          </p>
          <p className="font-semibold  text-md md:text-lg text-grey">3</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold  text-md md:text-lg text-lightGrey">
            Total Cost
          </p>
          <p className="font-semibold  text-md md:text-lg text-grey">
            Rs. 12000
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
          <p className="text-md md:text-lg text-black">Zainab Rashid</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Address
          </p>
          <p className="text-md md:text-lg text-black">Rs. 12000</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Address
          </p>
          <p className="text-md md:text-lg text-black">
            A-9 187/A8 Block 6 ABC Street Karachi
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Phone Number
          </p>
          <p className="text-md md:text-lg text-black">03032034978</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-md md:text-lg text-lightGrey">
            Email Address
          </p>
          <p className="text-md md:text-lg text-black">
            green.gardens-zainab@gmail.com
          </p>
        </div>
      </div>
      <h3 className="my-4 poppins text-black font-bold underline">
        Choose Vehicle
      </h3>
      <div className="flex justify-between p-4">
        <div className="border border-2 border-lightGreen p-4 flex flex-col items-center justify-center rounded-3xl">
          <img src="/images/admin/order/Bike.png"></img>
          <p className="poppins text-lightGreen font-semibold text-xl">
            Delivery Bike
          </p>
        </div>
        <div className="bg-lightGreen p-8 flex flex-col items-center justify-center rounded-3xl">
          <img src="/images/admin/order/Suzuki.png"></img>
          <p className="poppins text-white font-semibold text-xl">Suzuki</p>
        </div>
        <div className="border border-2 border-lightGreen p-8 flex flex-col items-center justify-center rounded-3xl">
          <img src="/images/admin/order/Truck.png"></img>
          <p className="poppins text-lightGreen font-semibold text-xl">Truck</p>
        </div>
      </div>
      <div className="flex justify-evenly gap-8 my-4">
        <button className="w-1/4 mt-4 bg-[#D9D9D9] hover:bg-lightGreen text-lightGreen hover:text-white text-lg md:text-xl py-3 rounded-xl font-semibold p-2">
          Go Back
        </button>
        <button className="w-1/4 mt-4 bg-lightGreen hover:bg-[#D9D9D9] text-white hover:text-lightGreen text-lg md:text-xl py-3 rounded-xl font-semibold p-2">
          Set as Accepted
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
