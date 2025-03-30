import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-dvh container mx-auto bg-bgSky p-12">
      <div className="flex flex-wrap  gap-8">
        <div className="card bg-base-100 card-sm shadow-sm w-[25%]  flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#D7D3ED] rounded-md h-1/2 p-2">
            <img
              src="/images/admin/dashboard/customer.png"
              className="h-full"
            />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">3000+</p>
            <p className="font-semibold">Total Customers</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#E1F4EB] rounded-md h-1/2 p-2">
            <img src="/images/admin/dashboard/plant.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">5000+</p>
            <p className="font-semibold">Total Products</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F8DDE3] h-1/2 p-2">
            <img src="/images/admin/dashboard/vendor.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">200+</p>
            <p className="font-semibold">Total Vendors</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F5F6CA] h-1/2 p-2">
            <img src="/images/admin/dashboard/sales.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">14000+</p>
            <p className="font-semibold">Total Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
