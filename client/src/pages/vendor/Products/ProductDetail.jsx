import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlant } from "../../../redux/slices/VendorPlantSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = location.state;
  console.log("Product Detail", item);
  const handleUpdate = () => {
    navigate("/vendor/products/update", { state: { item } });
  };
  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
      <div className="flex justify-between">
        <div className="poppins flex flex-col items-center">
          <h2 className="  text-black font-bold text-3xl">{item.name}</h2>
          <p className="text-grey text-sm"> {item._id}</p>
        </div>
        <div className="text-lightGreen flex gap-3 items-center">
          <div
            className="flex items-center justify-center px-4 py-2 gap-2 text-white bg-red rounded-lg min-w-28"
            onClick={() =>
              dispatch(
                deletePlant({ vendorId: item.vendorId, plantId: item._id })
              )
            }
          >
            <MdDelete size={20} />
            <span className="poppins font-semibold">Delete</span>
          </div>
          <div
            className="flex items-center justify-center px-4 py-2 gap-2 text-white bg-lightGreen rounded-lg min-w-28"
            onClick={handleUpdate}
          >
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
      {/* Top Image */}
      <div className="flex justify-center  my-8">
        <div className="w-52 h-64 border rounded flex items-center justify-center bg-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          ) : (
            "+"
          )}
        </div>
      </div>

      {/* Three Images in a Row */}
      <div className="grid grid-cols-3 gap-2 my-4 mx-auto">
        {[1, 2, 3].map((index) => (
          <div className="w-52 h-64 border rounded flex items-center justify-center bg-gray-100">
            {item.subImg[`subImg${index}`] ? (
              <img
                src={item.subImg[`subImg${index}`]}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            ) : (
              "+"
            )}
          </div>
        ))}
      </div>
      <div className="poppins text-grey flex justify-between my-8">
        <h3 className="font-semibold text-xl">Product Category</h3>
        <h5 className="text-lg">
          {item.category == "HousePlants"
            ? "House Plants"
            : `${item.category} Plants`}
        </h5>
      </div>
      <hr />
      <div className="my-8">
        <h3 className="poppins text-grey font-semibold text-xl mb-4">
          Product Description
        </h3>
        <p className="marcellus text-black text-base text-justify">
          {item.description}
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
                <div
                  className={`${
                    item.size.S ? "bg-lightGreen" : "bg-red"
                  } p-2 rounded-sm`}
                >
                  {item.size.S ? (
                    <TiTick color="white" size={16} />
                  ) : (
                    <ImCross color="white" size={16} />
                  )}
                </div>
                <span>Small</span>
              </div>
            </td>
            <td className="text-center text-lg p-6 ">
              <div className="flex items-center justify-center gap-x-2 ">
                <div
                  className={`${
                    item.size.M ? "bg-lightGreen" : "bg-red"
                  } p-2 rounded-sm`}
                >
                  {item.size.M ? (
                    <TiTick color="white" size={16} />
                  ) : (
                    <ImCross color="white" size={16} />
                  )}
                </div>
                <span>Medium</span>
              </div>
            </td>
            <td className="text-center text-lg p-6 ">
              <div className="flex items-center justify-center gap-x-2 ">
                <div
                  className={`${
                    item.size.L ? "bg-lightGreen" : "bg-red"
                  } p-2 rounded-sm`}
                >
                  {item.size.L ? (
                    <TiTick color="white" size={16} />
                  ) : (
                    <ImCross color="white" size={16} />
                  )}
                </div>
                <span>Large</span>
              </div>
            </td>
          </tr>
          <tr className="border-b">
            <td className="p-6">
              <span className="font-semibold text-xl">Prices (Rs)</span>
            </td>
            <td className="text-center text-lg p-6 ">
              {item.size.S ? item.size.S : "-"}
            </td>
            <td className="text-center text-lg p-6">
              {item.size.M ? item.size.M : "-"}
            </td>
            <td className="text-center  text-lg p-6">
              {item.size.L ? item.size.L : "-"}
            </td>
          </tr>
          <tr>
            <td className="p-6">
              <span className="font-semibold text-xl">Stock Quantity</span>
            </td>
            <td className="text-center text-lg p-6">
              {item.stockQuantity.S ? item.stockQuantity.S : "-"}
            </td>
            <td className="text-center text-lg p-6">
              {item.stockQuantity.M ? item.stockQuantity.M : "-"}
            </td>
            <td className="text-center text-lg p-6">
              {item.stockQuantity.L ? item.stockQuantity.L : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
