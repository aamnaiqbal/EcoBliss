import React from "react";
import { PiUserCircleDuotone } from "react-icons/pi";

const AdminOrder = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-white my-16 mx-8 p-8 rounded-xl">
        <div className="flex flex-row items-center gap-2">
          <div className="">
            <PiUserCircleDuotone className="text-[3.5rem]" />
          </div>
          <div>
            <h4 className="petrona font-semibold text-lightGreen text:xl md:text-2xl">
              Green Gardens
            </h4>
            <p className="poppins text-lightGrey text-md ">Order # 29102</p>
          </div>
        </div>
        <p className="poppins text-lightGrey text-lg mt-4">
          Request received on: Wed, March 12, 2024
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
        <div>
          <div className="flex justify-between">
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
        <button className="w-full mt-4 bg-lightGreen hover:bg-lightestGreen text-white py-2 rounded-xl font-semibold p-2">
          See Details
        </button>
      </div>
    </div>
  );
};

export default AdminOrder;
