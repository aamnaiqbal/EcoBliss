import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
const ProductDetail = () => {
  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
      <div className="flex justify-between">
        <div className="poppins flex flex-col items-center">
          <h2 className="  text-black font-bold text-3xl">Monstera Delicosa</h2>
          <p className="text-grey text-sm"> 671a40b179ecced09c18b59c</p>
        </div>
        <div className="text-lightGreen flex gap-3 items-center">
          <div className="flex items-center justify-center px-4 py-2 gap-2 text-white bg-red rounded-lg min-w-28">
            <MdDelete size={20} />
            <span className="poppins font-semibold">Delete</span>
          </div>
          <div className="flex items-center justify-center px-4 py-2 gap-2 text-white bg-lightGreen rounded-lg min-w-28">
            <MdEdit size={20} />
            <span className="poppins font-semibold">Edit</span>
          </div>
          <div className="flex items-center justify-center px-4 py-2 gap-2 border border-red rounded-lg min-w-28">
            <span className="poppins font-normal text-black">
              Set as Out of Stock
            </span>
          </div>
        </div>
      </div>
      <div className="poppins text-grey flex justify-between mb-2">
        <h3 className="font-semibold text-xl">Product Category</h3>
        <h5 className="text-lg">Outdoor Plants</h5>
      </div>
      <hr />
      <div className="my-8">
        <h3 className="poppins text-grey font-semibold text-xl mb-4">
          Product Description
        </h3>
        <p className="marcellus text-black text-base text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.
        </p>
      </div>
      <hr />
      <table className="w-full text-grey poppins">
        <tbody>
          <tr className="border-b ">
            <td className="text-left p-6">
              <span className="font-semibold text-xl">Sizes</span>
            </td>
            <td className="text-center text-lg p-6 ">
              <div className="flex items-center justify-center gap-x-2 ">
                <div className="bg-lightGreen p-2 rounded-sm">
                  <TiTick color="white" size={16} />
                </div>
                <span>Small</span>
              </div>
            </td>
            <td className="text-center text-lg p-6 ">
              <div className="flex items-center justify-center gap-x-2 ">
                <div className="bg-lightGreen p-2 rounded-sm">
                  <TiTick color="white" size={16} />
                </div>
                <span>Medium</span>
              </div>
            </td>
            <td className="text-center text-lg p-6 ">
              <div className="flex items-center justify-center gap-x-2 ">
                <div className="bg-red p-2 rounded-sm">
                  <ImCross color="white" size={16} />
                </div>
                <span>Small</span>
              </div>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-6">
              <span className="font-semibold text-xl">Prices (Rs)</span>
            </td>
            <td className="text-center text-lg p-6 ">500</td>
            <td className="text-center text-lg p-6">1000</td>
            <td className="text-center  text-lg p-6">-</td>
          </tr>
          <tr>
            <td className="p-6">
              <span className="font-semibold text-xl">Stock Quantity</span>
            </td>
            <td className="text-center text-lg p-6">13</td>
            <td className="text-center text-lg p-6">25</td>
            <td className="text-center text-lg p-6">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
