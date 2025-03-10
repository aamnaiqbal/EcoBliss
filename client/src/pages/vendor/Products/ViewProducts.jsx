import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
      <div className="flex justify-between poppins">
        <h3 className="font-semibold text-xl">My Products</h3>
        <div className="text-lightGreen flex gap-3 items-center">
          <IoIosAddCircle size={20} />
          <h4 className="font-semibold text-lg">Add more</h4>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4 text-grey ">
          <img
            src="/images/Orchid/img1.jpg"
            className="max-h-40 w-36 border-2 border-black"
          ></img>
          <h4 className="poppins font-medium ">671a40b179ecced09c18b59c</h4>
          <p className="poppins font-medium ">Stock 4</p>
          <p className="poppins font-medium  lg:w-28 ">Rs. 700</p>
          <Link to="/vendor/products/details">
            <MdKeyboardArrowRight size={28} className="cursor-pointer " />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4 text-grey ">
          <img
            src="/images/Orchid/img1.jpg"
            className="max-h-40 w-36 border-2 border-black"
          ></img>
          <h4 className="poppins font-medium ">671a40b179ecced09c18b59c</h4>
          <p className="poppins font-medium ">Stock 4</p>
          <p className="poppins font-medium  lg:w-28 ">Rs. 700</p>
          <MdKeyboardArrowRight
            size={28}
            className="cursor-pointer "
            // onClick={() => deleteCartItem(auth.id, item.productId._id, Size)}
          />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4 text-grey ">
          <img
            src="/images/Orchid/img1.jpg"
            className="max-h-40 w-36 border-2 border-black"
          ></img>
          <h4 className="poppins font-medium ">671a40b179ecced09c18b59c</h4>
          <p className="poppins font-medium ">Stock 4</p>
          <p className="poppins font-medium  lg:w-28 ">Rs. 700</p>
          <MdKeyboardArrowRight
            size={28}
            className="cursor-pointer "
            // onClick={() => deleteCartItem(auth.id, item.productId._id, Size)}
          />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4 text-grey ">
          <img
            src="/images/Orchid/img1.jpg"
            className="max-h-40 w-36 border-2 border-black"
          ></img>
          <h4 className="poppins font-medium ">671a40b179ecced09c18b59c</h4>
          <p className="poppins font-medium ">Stock 4</p>
          <p className="poppins font-medium  lg:w-28 ">Rs. 700</p>
          <Link to="/vendor/products/details">
            <MdKeyboardArrowRight size={28} className="cursor-pointer " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
