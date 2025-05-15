// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { BsCashCoin } from "react-icons/bs";
// import { FaCcVisa } from "react-icons/fa";
// import Item from "./Item";
// import { clearCart } from "../../redux/slices/CartSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// const Checkout = () => {
//   // const { cartItems, subtotal, setCartItems, setSubtotal } =useContext(CartContext);
//   const { cartItems, subtotal } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth.userAuth);

//   const [shippingCharges] = useState(500);
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const navigate = useNavigate();

//   const fullname = useRef(null);
//   const address = useRef(null);
//   const phoneNo = useRef(null);
//   const cardNo = useRef(null);
//   const expirationDate = useRef(null);
//   const securityCode = useRef(null);
//   const nameOnCard = useRef(null);

//   const handleCheckout = async () => {
//     const orderData = {
//       customerId: auth.id,
//       shippingCharges,
//       totalAmount: shippingCharges + subtotal,
//       paymentMethod,
//       shippingDetails: {
//         fullName: fullname.current.value,
//         address: address.current.value,
//         phoneNo: phoneNo.current.value,
//       },
//     };

//     console.log(orderData);
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/order",
//         orderData
//       );
//       console.log("response", response);
//       toast.success("Order Placed successfully.");
//       const orderId = response.data.order._id;
//       dispatch(clearCart());
//       navigate("/checkout/message", { state: { orderId } });
//     } catch (err) {
//       console.log("There was some error in checking out.", err);
//       let formattedMessage = err.response.data.message.replace(
//         "Order validation failed:",
//         ""
//       );
//       toast.error(formattedMessage);
//     }
//   };

//   return (
//     <div className="max-w-screen-2xl container mx-auto px-4 md:px-16 xxl:px-24 lg:pt-48 pt-24 flex flex-col flex-col-reverse lg:flex-row gap-4 mb-8 relative select-none">
//       <div className="lg:w-[50%]">
//         <div>
//           <h3 className="marcellus font-medium text-xl mb-8">Delivery</h3>
//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Full name"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={fullname}
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={address}
//             />
//             <input
//               type="number"
//               placeholder="Phone Number"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={phoneNo}
//             />
//           </div>
//         </div>
//         <div className="mt-8">
//           <h3 className="marcellus font-medium text-xl ">Payment</h3>
//           <div
//             className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 flex items-center justify-center gap-4`}
//             onClick={() => {
//               setPaymentMethod("Cash on Delivery");
//               handleCheckout();
//             }}
//           >
//             <BsCashCoin size={24} /> <span>Cash On Delivery</span>
//           </div>
//           <div
//             className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 flex items-center justify-center gap-4 }`}
//             onClick={() => setPaymentMethod("Card")}
//           >
//             <FaCcVisa size={24} /> <span>Pay with Card</span>
//           </div>
//           <div
//             className={`flex flex-col gap-4 border border-grey px-4 py-8 rounded-md ${
//               paymentMethod !== "Cash on Delivery" ? "flex" : "hidden"
//             }`}
//           >
//             <input
//               type="number"
//               placeholder="Card Number"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={cardNo}
//             />
//             <input
//               type="text"
//               placeholder="Expiration Date (MM/YY)"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={expirationDate}
//             />
//             <input
//               type="text"
//               placeholder="Security Code"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={securityCode}
//             />
//             <input
//               type="text"
//               placeholder="Name on Card"
//               className="border border-grey p-[10px] rounded-md outline-none"
//               ref={nameOnCard}
//             />
//             <button
//               className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 mt-4 w-1/2 mx-auto`}
//               onClick={() => {
//                 handleCheckout();
//               }}
//             >
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="lg:w-1/2 border border-[#CAD6F1] px-4  h-max sticky lg:top-8  mb-4">
//         <div className="md:max-h-72  max-h-[36rem] overflow-y-scroll">
//           {cartItems.map((item, i) => (
//             <Item key={i} item={item} />
//           ))}
//         </div>
//         <div className="px-4 pb-8">
//           <div className="flex justify-between petrona text-lg font-semibold">
//             <p>Subtotal</p>
//             <p>Rs. {subtotal}</p>
//           </div>
//           <div className="flex justify-between petrona text-lg font-semibold border-b border-grey pb-4">
//             <p>Shipping</p>
//             <p>Rs. {shippingCharges}</p>
//           </div>
//           <div className="flex justify-between petrona text-2xl font-bold ">
//             <p>Total</p>
//             <p>Rs. {subtotal + shippingCharges}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsCashCoin } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";
import Item from "./Item";
import { clearCart } from "../../redux/slices/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const { cartItems, subtotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userAuth);
  const navigate = useNavigate();

  const [shippingCharges] = useState(500);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const fullnameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);

  const handleCheckout = async () => {
    const fullName = fullnameRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const phoneNo = phoneRef.current.value.trim();

    if (!fullName || !address || !phoneNo) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    const orderData = {
      customerId: auth.id,
      shippingCharges,
      totalAmount: shippingCharges + subtotal,
      paymentMethod,
      shippingDetails: { fullName, address, phoneNo },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/order",
        orderData
      );

      toast.success("Order placed successfully.");
      const orderId = response.data.order._id;
      dispatch(clearCart());
      // setIsPaymentCompleted(true);
      // toast.info("Payment successful. Your order will be delivered soon.");
      navigate(`/checkout/message/:${orderId}`);
    } catch (err) {
      const formattedMessage = err.response?.data?.message?.replace(
        "Order validation failed:",
        ""
      );
      toast.error(formattedMessage || "Something went wrong.");
    }
  };

  const handlePayFastRedirect = async () => {
    const fullName = fullnameRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const phoneNo = phoneRef.current.value.trim();

    if (!fullName || !address || !phoneNo) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    setPaymentMethod("Card");

    const orderData = {
      customerId: auth.id,
      shippingCharges,
      totalAmount: shippingCharges + subtotal,
      paymentMethod: "Card",
      shippingDetails: { fullName, address, phoneNo },
      isPaid: false, // You can update this to true later
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/order",
        orderData
      );
      const orderId = response.data.order._id;

      // Then continue with PayFast redirect
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.payfast.co.za/eng/process";

      const paymentData = {
        merchant_id: "10038696",
        merchant_key: "noe4u5bewjkkd",
        amount: (subtotal + shippingCharges).toFixed(2),
        item_name: "Order from MeraCNet",
        m_payment_id: orderId.toString(), // required for return URL use
        custom_str1: orderId.toString(),
        return_url: `http://localhost:5173/order/payment-return?m_payment_id=${orderId}&payment_status=COMPLETE`,
        cancel_url: "http://localhost:5173/payment-cancel",
        notify_url:
          " https://198c-111-68-110-251.ngrok-free.app/api/v1/order/payfast-notify",
      };

      for (const key in paymentData) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      toast.error("Failed to create order before payment.");
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-16 xxl:px-24 lg:pt-48 pt-24 flex flex-col-reverse lg:flex-row gap-4 mb-8 select-none">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h3 className="marcellus font-medium text-xl mb-8">Delivery</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            ref={fullnameRef}
            className="border border-grey p-[10px] rounded-md outline-none"
          />
          <input
            type="text"
            placeholder="Address"
            ref={addressRef}
            className="border border-grey p-[10px] rounded-md outline-none"
          />
          <input
            type="number"
            placeholder="Phone Number"
            ref={phoneRef}
            className="border border-grey p-[10px] rounded-md outline-none"
          />
        </div>

        <h3 className="marcellus font-medium text-xl mt-8">Payment</h3>

        {/* Cash on Delivery Button */}
        <button
          className="btn text-white text-lg bg-green w-full mt-8 flex items-center justify-center gap-4"
          onClick={() => {
            const fullName = fullnameRef.current?.value.trim();
            const address = addressRef.current?.value.trim();
            const phoneNo = phoneRef.current?.value.trim();

            if (!fullName || !address || !phoneNo) {
              toast.error("Please fill in all delivery details.");
              return;
            }

            setPaymentMethod("Cash on Delivery");
            handleCheckout();
          }}
        >
          <BsCashCoin size={24} />
          <span>Cash On Delivery</span>
        </button>

        {/* PayFast Button */}
        <button
          className="btn text-white text-lg bg-green w-full mt-4 flex items-center justify-center gap-4"
          onClick={() => {
            const fullName = fullnameRef.current?.value.trim();
            const address = addressRef.current?.value.trim();
            const phoneNo = phoneRef.current?.value.trim();

            if (!fullName || !address || !phoneNo) {
              toast.error("Please fill in all delivery details.");
              return;
            }

            setPaymentMethod("Card");
            handlePayFastRedirect();
          }}
        >
          <FaCcVisa size={24} />
          <span>Pay with PayFast Online</span>
        </button>
      </div>

      {/* Right Section - Cart Summary */}
      <div className="lg:w-1/2 border border-[#CAD6F1] px-4 h-max sticky lg:top-8 mb-4">
        <div className="md:max-h-72 max-h-[36rem] overflow-y-scroll">
          {cartItems.map((item, i) => (
            <Item key={i} item={item} isPaid={isPaymentCompleted} />
          ))}
        </div>
        <div className="px-4 pb-8">
          <div className="flex justify-between petrona text-lg font-semibold">
            <p>Subtotal</p>
            <p>Rs. {subtotal}</p>
          </div>
          <div className="flex justify-between petrona text-lg font-semibold border-b border-grey pb-4">
            <p>Shipping</p>
            <p>Rs. {shippingCharges}</p>
          </div>
          <div className="flex justify-between petrona text-2xl font-bold">
            <p>Total</p>
            <p>Rs. {subtotal + shippingCharges}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
