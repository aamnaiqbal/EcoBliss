// import React, { useState } from "react";
// import { FaFilter } from "react-icons/fa";

// const ordersData = [
//   {
//     id: 1,
//     product: "Monstera Deliciosa",
//     productId: "092630401239",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Complete",
//   },
//   {
//     id: 2,
//     product: "Monstera Deliciosa",
//     productId: "092630401739",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     product: "Monstera Deliciosa",
//     productId: "092630401239",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Ready-to-ship",
//   },
//   {
//     id: 4,
//     product: "Monstera Deliciosa",
//     productId: "092630401239",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Complete",
//   },
//   {
//     id: 5,
//     product: "Monstera Deliciosa",
//     productId: "092630401739",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Complete",
//   },
// ];

// const OrdersPage = () => {
//   const [filter, setFilter] = useState("All");

//   const filteredOrders =
//     filter === "All"
//       ? ordersData
//       : ordersData.filter((order) => order.status === filter);

//   return (
//     <div className="bg-customWhite my-16 mx-8 p-8 rounded-xl">
//       <h1 className="text-3xl font-semibold mb-4 marcellus">Orders</h1>
//       <div className="flex items-center gap-4 mb-4">
//         {["All", "Pending", "Ready-to-ship", "Complete"].map((status) => (
//           <button
//             key={status}
//             className={`px-4 py-2 rounded ${
//               filter === status
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setFilter(status)}
//           >
//             {status} Orders
//           </button>
//         ))}
//         <button className="ml-auto flex items-center gap-2 px-4 py-2 text-lightGreen border-2  border-lightGreen rounded">
//           <FaFilter size={16} /> Filter
//         </button>
//       </div>
//       <div className="bg-white p-4 shadow-md rounded-lg">
//         <table className="w-full ">
//           <thead>
//             <tr className="poppins">
//               <th className="p-2">Product</th>
//               <th className="p-2">Product ID</th>
//               <th className=" p-2">Quantity</th>
//               <th className="p-2">Total Price</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.id} className="text-center">
//                 <td className="p-2 flex items-center gap-2">
//                   <img
//                     src="/monstera.jpg"
//                     alt="Product"
//                     className="w-12 h-12 rounded"
//                   />
//                   {order.product}
//                 </td>
//                 <td className="p-2">{order.productId}</td>
//                 <td className="p-2">{order.quantity}</td>
//                 <td className="p-2">{order.total}</td>
//                 <td className="p-2">{order.date}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-3 py-1 rounded text-white ${
//                       order.status === "Complete"
//                         ? "bg-green-500"
//                         : order.status === "Pending"
//                         ? "bg-yellow-500"
//                         : "bg-blue-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody> */}
//           <tbody>
//             <tr className="text-center">
//               <td className="flex items-center gap-2 ">
//                 <img
//                   src="/images/HousePlants/img16.jpg"
//                   className="max-h-32 w-28 border-2 border-black"
//                 ></img>
//                 Monstera Delicosa
//               </td>
//               <td className="p-2">67e658a3f5e455effc5e5d57</td>
//               <td className="p-4 ">2</td>
//               <td className="p-4 ">5000</td>
//               <td className="p-4 ">12-03-25</td>
//               <td>
//                 <button>Complete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorOrders } from "../../redux/slices/vendorOrderSlice";
import { useEffect } from "react";

const OrdersPage = () => {
  // const { orders, status, error } = useSelector((state) => state.vendorOrders);
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const dispatch = useDispatch();
  useEffect(() => {
    // if (status === "idle") {
    dispatch(fetchVendorOrders(vendorId));
    // }
  }, [dispatch]);

  // if (status === "loading") return <p>Loading...</p>;
  // if (status === "failed") return <p>Error</p>;
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-white my-16 mx-8 p-8 rounded-xl">
        <p className="font-semibold  text-md md:text-lg text-black">
          Order Id:
          <span className="font-semibold  text-md md:text-lg text-grey italic">
            677789089766887
          </span>
        </p>

        <p className="poppins text-lightGrey text-lg mt-4">
          Order received on: Wed, March 12, 2024
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

export default OrdersPage;
