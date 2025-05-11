import React, { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../../redux/slices/VendorPlantSlice";

const ViewProducts = () => {
  const { plants, status, error } = useSelector((state) => state.vendorPlants);
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlants(vendorId));
    }
  }, [dispatch, status]);
  return (
    <div className="bg-white mb-12 mt-32  mx-8 p-8 rounded-xl">
      <div className="flex justify-between poppins">
        <h3 className="font-semibold text-xl">My Products</h3>

        <Link to="/vendor/products/add">
          <div className="text-lightGreen flex gap-3 items-center cursor-pointer">
            <IoIosAddCircle size={20} />
            <h4 className="font-semibold text-lg">Add more</h4>
          </div>
        </Link>
      </div>
      {/* LOADING STATE */}
      {status === "loading" && (
        <p className="text-center text-blue-600 font-medium text-lg my-10">
          Loading plants...
        </p>
      )}

      {/* ERROR STATE */}
      {status === "failed" && (
        <p className="text-center text-red-500 font-medium text-lg my-10">
          No plants found.
        </p>
      )}

      {/* ORDERS */}
      {status === "succeeded" && plants.length === 0 && (
        <p className="text-center text-blue-600 font-medium text-xl my-10">
          No plants found.
        </p>
      )}
      {plants.map((item, i) => (
        <div
          className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4 text-grey "
          key={item._id}
        >
          <img
            src={item.image}
            className="max-h-40 w-36 border-2 border-black"
          ></img>
          <h4 className="poppins font-medium ">{item._id}</h4>
          <p className="poppins font-medium ">
            {item.stockQuantity.S ? item.stockQuantity.S : "-"}
          </p>
          <p className="poppins font-medium ">
            {item.stockQuantity.M ? item.stockQuantity.M : "-"}
          </p>
          <p className="poppins font-medium ">
            {item.stockQuantity.L ? item.stockQuantity.L : "-"}
          </p>
          <Link to={`/vendor/products/details/${item._id}`} state={item}>
            <MdKeyboardArrowRight size={28} className="cursor-pointer " />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ViewProducts;
