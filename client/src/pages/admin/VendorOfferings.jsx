import React, { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchVerifiedVendors } from "../../redux/slices/AdminVendorDetailsSlice";
import { Link } from "react-router-dom";

const VendorOfferings = () => {
  const { vendors, status, loading, error } = useSelector(
    (state) => state.adminVendorDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVerifiedVendors());
    }
  }, [dispatch, status]);

  console.log(vendors);

  return (
    <>
      {" "}
      {/* LOADING STATE */}
      {status === "loading" && (
        <p className="text-center text-blue-600 font-medium text-lg my-10">
          Loading Vendors...
        </p>
      )}
      {/* ERROR STATE */}
      {status === "failed" && (
        <p className="text-center text-red-500 font-medium text-lg my-10">
          Error fetching vendors. Please try again.
        </p>
      )}
      {status === "succeeded" && vendors.length === 0 && (
        <p className="text-center text-blue-600 font-medium text-xl my-10">
          No Vendors found.
        </p>
      )}
      <div className="pt-28 pb-8 px-8 flex flex-wrap justify-center">
        {vendors?.map((vendor) => (
          <div className="bg-white my-8 mx-8 p-8 rounded-xl" key={vendor._id}>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <div className="">
                  <PiUserCircleDuotone className="text-[3.5rem]" />
                </div>
                <div>
                  <h4 className="petrona font-semibold text-lightGreen text:xl md:text-2xl">
                    {vendor.nurseryName}
                  </h4>
                  <p className="poppins text-lightGrey text-md ">
                    ID # {vendor._id}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-semibold  text-md md:text-lg text-lightGrey">
                  Total Items
                </p>
                <p className="font-semibold  text-md md:text-lg text-grey">
                  {vendor.totalPlants}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold  text-md md:text-lg text-lightGrey">
                  Total Earnings
                </p>
                <p className="font-semibold  text-md md:text-lg text-grey">
                  Rs. {vendor.totalEarnings}
                </p>
              </div>
            </div>
            <Link to={`${vendor._id}`}>
              <button className="w-full mt-4 bg-lightGreen hover:bg-lightestGreen text-white py-2 rounded-xl font-semibold p-2">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default VendorOfferings;
