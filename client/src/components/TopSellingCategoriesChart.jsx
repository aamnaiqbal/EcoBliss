// import React, { useEffect, useState } from "react";
// import { fetchTopSellingCategories } from "../redux/slices/AdminDashboardSlice";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useDispatch, useSelector } from "react-redux";

// const TopSellingCategoriesChart = () => {
//   const dispatch = useDispatch();
//   const { topSellingCategories, loading, error } = useSelector(
//     (state) => state.adminDashboard
//   );

//   useEffect(() => {
//     if (!topSellingCategories) dispatch(fetchTopSellingCategories());
//   }, [dispatch]);

//   console.log(topSellingCategories);
//   return (
//     // <div style={{ width: "100%", height: 400 }}>
//     //   <h2 className="text-lg font-bold mb-4">Top Selling Categories</h2>
//     //   <ResponsiveContainer>
//     //     <BarChart data={data}>
//     //       <CartesianGrid strokeDasharray="3 3" />
//     //       <XAxis dataKey="category" />
//     //       <YAxis />
//     //       <Tooltip />
//     //       <Bar dataKey="sold" fill="#4ade80" />
//     //     </BarChart>
//     //   </ResponsiveContainer>
//     // </div>
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Top Selling Plant Categories</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={topSellingCategories}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="category" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="sold" fill="#82ca9d" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TopSellingCategoriesChart;

import React, { useEffect } from "react";
import { fetchTopSellingCategories } from "../redux/slices/AdminDashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

const TopSellingCategoriesChart = () => {
  const dispatch = useDispatch();
  const { topSellingCategories, loading, error } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    if (!topSellingCategories || topSellingCategories.length === 0) {
      dispatch(fetchTopSellingCategories());
    }
  }, [dispatch, topSellingCategories]);

  // Optional: Trim category names to avoid issues with spacing or formatting
  const cleanedData =
    topSellingCategories?.map((item) => ({
      category: item.category.trim(), // Trim whitespace
      sold: item.sold,
    })) || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top Selling Plant Categories</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={cleanedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sold" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSellingCategoriesChart;
