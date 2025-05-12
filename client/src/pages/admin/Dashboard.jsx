// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardStats } from "../../redux/slices/AdminDashboardSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     totalVendors,
//     totalPlants,
//     totalCustomers,
//     totalSales,
//     loading,
//     error,
//   } = useSelector((state) => state.adminDashboard);

//   console.log(totalSales);

//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
// <div className="pt-28 pb-8 px-8">
//   <div className="flex flex-wrap  gap-8 justify-center">
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%]  flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#D7D3ED] rounded-md h-1/2 p-2">
//         <img
//           src="/images/admin/dashboard/customer.png"
//           className="h-full"
//         />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalCustomers}</p>
//         <p className="font-semibold">Total Customers</p>
//       </div>
//     </div>
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#E1F4EB] rounded-md h-1/2 p-2">
//         <img src="/images/admin/dashboard/plant.png" className="h-full" />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalPlants}</p>
//         <p className="font-semibold">Total Products</p>
//       </div>
//     </div>
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#F8DDE3] h-1/2 p-2">
//         <img src="/images/admin/dashboard/vendor.png" className="h-full" />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalVendors}</p>
//         <p className="font-semibold">Total Vendors</p>
//       </div>
//     </div>
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#F5F6CA] h-1/2 p-2">
//         <img src="/images/admin/dashboard/sales.png" className="h-full" />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalSales.totalProductRevenue}</p>
//         <p className="font-semibold">Total Product Revenue</p>
//       </div>
//     </div>
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#F5F6CA] h-1/2 p-2">
//         <img src="/images/admin/dashboard/sales.png" className="h-full" />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalSales.totalShippingRevenue}</p>
//         <p className="font-semibold">Total Shipping Revenue</p>
//       </div>
//     </div>
//     <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
//       <div className="bg-[#F5F6CA] h-1/2 p-2">
//         <img src="/images/admin/dashboard/sales.png" className="h-full" />
//       </div>
//       <div className="marcellus p-2">
//         <p className="font-bold">{totalSales.totalRevenue}</p>
//         <p className="font-semibold">Total Revenue</p>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/slices/AdminDashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TopSellingCategoriesChart from "../../components/TopSellingCategoriesChart";

const COLORS = ["#8884d8", "#82ca9d"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalVendors,
    totalPlants,
    totalCustomers,
    totalSales,
    loading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Data for Bar Chart
  const overviewData = [
    { name: "Vendors", count: totalVendors },
    { name: "Plants", count: totalPlants },
    { name: "Buyers", count: totalCustomers },
  ];

  // Data for Pie Chart
  const revenueData = [
    { name: "Product Revenue", value: totalSales.totalProductRevenue },
    { name: "Shipping Revenue", value: totalSales.totalShippingRevenue },
  ];

  return (
    <div className="pt-28 pb-8 px-8">
      <div className="flex flex-wrap  gap-8 justify-center">
        <div className="card bg-base-100 card-sm shadow-sm w-[25%]  flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#D7D3ED] rounded-md h-1/2 p-2">
            <img
              src="/images/admin/dashboard/customer.png"
              className="h-full"
            />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalCustomers}</p>
            <p className="font-semibold">Total Customers</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#E1F4EB] rounded-md h-1/2 p-2">
            <img src="/images/admin/dashboard/plant.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalPlants}</p>
            <p className="font-semibold">Total Products</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F8DDE3] h-1/2 p-2">
            <img src="/images/admin/dashboard/vendor.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalVendors}</p>
            <p className="font-semibold">Total Vendors</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F5F6CA] h-1/2 p-2">
            <img src="/images/admin/dashboard/sales.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalSales.totalProductRevenue}</p>
            <p className="font-semibold">Total Product Revenue</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F5F6CA] h-1/2 p-2">
            <img src="/images/admin/dashboard/sales.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalSales.totalShippingRevenue}</p>
            <p className="font-semibold">Total Shipping Revenue</p>
          </div>
        </div>
        <div className="card bg-base-100 card-sm shadow-sm w-[25%] flex flex-row  items-center justify-center gap-4 p-2">
          <div className="bg-[#F5F6CA] h-1/2 p-2">
            <img src="/images/admin/dashboard/sales.png" className="h-full" />
          </div>
          <div className="marcellus p-2">
            <p className="font-bold">{totalSales.totalRevenue}</p>
            <p className="font-semibold">Total Revenue</p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* --- Bar Chart for Overview --- */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* --- Pie Chart for Revenue --- */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <TopSellingCategoriesChart />
      </div>
    </div>
  );
};

export default Dashboard;
