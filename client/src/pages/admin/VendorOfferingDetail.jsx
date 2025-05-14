import React, { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../redux/slices/VendorPlantSlice";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVerifiedVendors } from "../../redux/slices/AdminVendorDetailsSlice";
import { FaArrowLeft } from "react-icons/fa";

const VendorOfferingDetail = () => {
  const { plants, status } = useSelector((state) => state.vendorPlants);
  const dispatch = useDispatch();
  const { vendorId } = useParams();
  console.log(vendorId);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlants(vendorId));
    }
  }, [dispatch, status]);

  const vendor = useSelector((state) =>
    state.adminVendorDetails.vendors.find((vendor) => vendor._id === vendorId)
  );

  console.log(vendor);

  useEffect(() => {
    if (!vendor) {
      dispatch(fetchVerifiedVendors());
    }
  }, [dispatch, vendor]);

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
        <div className="flex flex-row items-center gap-2">
          <PiUserCircleDuotone className="text-[5.5rem]" />
          <div>
            <h4 className="petrona font-semibold text-lightGreen text-xl md:text-3xl md:text-2xl">
              {vendor?.nurseryName}
            </h4>
            <p className="poppins text-lightGrey text-md ">
              ID # {vendor?._id}
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
                <td className="py-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <img
                      src={item.image}
                      className="h-28 w-32 rounded-md"
                    ></img>
                    <p>{item.name}</p>
                  </div>
                </td>
                <td className="text-center p-2">{item._id}</td>
                <td className="text-center p-2">
                  {(item.stockQuantity.S || 0) +
                    (item.stockQuantity.M || 0) +
                    (item.stockQuantity.L || 0)}
                </td>

                <td className="text-center p-2">
                  <div className="flex flex-col">
                    <p>
                      {item.stockQuantity.S
                        ? `S (${item.stockQuantity.S})`
                        : "-"}
                    </p>
                    <p>
                      {item.stockQuantity.M
                        ? `M (${item.stockQuantity.M})`
                        : "-"}
                    </p>
                    <p>
                      {item.stockQuantity.L
                        ? `L (${item.stockQuantity.L})`
                        : "-"}
                    </p>
                  </div>
                </td>
                <td className="text-right p-2">
                  <div className="flex flex-col">
                    <p>{item.size.S ? `${item.size.S}` : "-"}</p>
                    <p>{item.size.M ? `${item.size.M}` : "-"}</p>
                    <p>{item.size.L ? `${item.size.L}` : "-"}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <h3 className="my-4 poppins text-black font-bold underline">
          Vendor Details
        </h3>
        <div className="p-2 ">
          <div className="flex justify-between ">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Name
            </p>
            <p className="text-md md:text-lg text-black">{vendor?.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Address
            </p>
            <p className="text-md md:text-lg text-black">{vendor?.address}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Phone Number
            </p>
            <p className="text-md md:text-lg text-black">{vendor?.phoneNo}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Email Address
            </p>
            <p className="text-md md:text-lg text-black">{vendor?.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Total Items
            </p>
            <p className="text-md md:text-lg text-black">
              {vendor?.totalPlants}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-md md:text-lg text-lightGrey">
              Total Income
            </p>
            <p className="text-md md:text-lg text-black">
              Rs. {vendor?.totalEarnings}
            </p>
          </div>
        </div>

        {/* <div className="flex justify-evenly gap-8 my-4">
          <button className="w-1/2 mt-4 bg-red  text-white text-lg md:text-xl py-3 rounded-xl font-semibold p-2">
            Delete Vendor
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VendorOfferingDetail;
