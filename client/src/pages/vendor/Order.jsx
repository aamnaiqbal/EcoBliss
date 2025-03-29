// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableHeaderCell,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Filter } from "lucide-react";

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
//   {
//     id: 6,
//     product: "Monstera Deliciosa",
//     productId: "092630401739",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Complete",
//   },
//   {
//     id: 7,
//     product: "Monstera Deliciosa",
//     productId: "092630401239",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Pending",
//   },
//   {
//     id: 8,
//     product: "Monstera Deliciosa",
//     productId: "092630401239",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Pending",
//   },
//   {
//     id: 9,
//     product: "Monstera Deliciosa",
//     productId: "092630401739",
//     quantity: 2,
//     total: 5000,
//     date: "12-03-25",
//     status: "Ready-to-ship",
//   },
//   {
//     id: 10,
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
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">Orders</h1>
//       <div className="flex items-center gap-4 mb-4">
//         <Button
//           variant={filter === "All" ? "default" : "outline"}
//           onClick={() => setFilter("All")}
//         >
//           All orders
//         </Button>
//         <Button
//           variant={filter === "Pending" ? "default" : "outline"}
//           onClick={() => setFilter("Pending")}
//         >
//           Pending orders
//         </Button>
//         <Button
//           variant={filter === "Ready-to-ship" ? "default" : "outline"}
//           onClick={() => setFilter("Ready-to-ship")}
//         >
//           Ready-to-ship
//         </Button>
//         <Button
//           variant={filter === "Complete" ? "default" : "outline"}
//           onClick={() => setFilter("Complete")}
//         >
//           Completed
//         </Button>
//         <Button variant="outline" className="ml-auto flex items-center gap-2">
//           <Filter size={16} /> Filter
//         </Button>
//       </div>
//       <Card>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableHeaderCell>Product</TableHeaderCell>
//                 <TableHeaderCell>Product ID</TableHeaderCell>
//                 <TableHeaderCell>Quantity</TableHeaderCell>
//                 <TableHeaderCell>Total Price</TableHeaderCell>
//                 <TableHeaderCell>Date</TableHeaderCell>
//                 <TableHeaderCell>Status</TableHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredOrders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell>
//                     <img
//                       src="/monstera.jpg"
//                       alt="Product"
//                       className="w-12 h-12 rounded"
//                     />
//                     {order.product}
//                   </TableCell>
//                   <TableCell>{order.productId}</TableCell>
//                   <TableCell>{order.quantity}</TableCell>
//                   <TableCell>{order.total}</TableCell>
//                   <TableCell>{order.date}</TableCell>
//                   <TableCell>
//                     <Badge
//                       className={
//                         order.status === "Complete"
//                           ? "bg-green-500 text-white"
//                           : order.status === "Pending"
//                           ? "bg-yellow-500 text-white"
//                           : "bg-blue-500 text-white"
//                       }
//                     >
//                       {order.status}
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const ordersData = [
  {
    id: 1,
    product: "Monstera Deliciosa",
    productId: "092630401239",
    quantity: 2,
    total: 5000,
    date: "12-03-25",
    status: "Complete",
  },
  {
    id: 2,
    product: "Monstera Deliciosa",
    productId: "092630401739",
    quantity: 2,
    total: 5000,
    date: "12-03-25",
    status: "Pending",
  },
  {
    id: 3,
    product: "Monstera Deliciosa",
    productId: "092630401239",
    quantity: 2,
    total: 5000,
    date: "12-03-25",
    status: "Ready-to-ship",
  },
  {
    id: 4,
    product: "Monstera Deliciosa",
    productId: "092630401239",
    quantity: 2,
    total: 5000,
    date: "12-03-25",
    status: "Complete",
  },
  {
    id: 5,
    product: "Monstera Deliciosa",
    productId: "092630401739",
    quantity: 2,
    total: 5000,
    date: "12-03-25",
    status: "Complete",
  },
];

const OrdersPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? ordersData
      : ordersData.filter((order) => order.status === filter);

  return (
    <div className="bg-customWhite my-16 mx-8 p-8 rounded-xl">
      <h1 className="text-3xl font-semibold mb-4 marcellus">Orders</h1>
      <div className="flex items-center gap-4 mb-4">
        {["All", "Pending", "Ready-to-ship", "Complete"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(status)}
          >
            {status} Orders
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 text-lightGreen border-2  border-lightGreen rounded">
          <FaFilter size={16} /> Filter
        </button>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full ">
          <thead>
            <tr className="poppins">
              <th className="p-2">Product</th>
              <th className="p-2">Product ID</th>
              <th className=" p-2">Quantity</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          {/* <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src="/monstera.jpg"
                    alt="Product"
                    className="w-12 h-12 rounded"
                  />
                  {order.product}
                </td>
                <td className="p-2">{order.productId}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.total}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "Complete"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            <tr className="text-center">
              <td className="flex items-center gap-2 ">
                <img
                  src="/images/HousePlants/img16.jpg"
                  className="max-h-32 w-28 border-2 border-black"
                ></img>
                Monstera Delicosa
              </td>
              <td className="p-2">67e658a3f5e455effc5e5d57</td>
              <td className="p-4 ">2</td>
              <td className="p-4 ">5000</td>
              <td className="p-4 ">12-03-25</td>
              <td>
                <button>Complete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
