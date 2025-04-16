import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../redux/slices/CartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, subtotal } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.userAuth);
  const userId = auth?.id;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [auth?.id]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:px-16 px-4 lg:pt-48 pt-24  mb-8">
      <h2 className="marcellus text-3xl font-md">Cart</h2>
      {auth ? (
        <div className="">
          {cartItems.map((item, i) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <div className="text-xl my-28 text-center text-grey">
          Please login to see your cart items.
        </div>
      )}
      {cartItems.length === 0 && auth && (
        <div className="text-xl my-28 text-center text-grey">
          <p>Please add items to your cart.</p>
          <p>Happy Shopping.</p>{" "}
        </div>
      )}
      <div className="px-12">
        <div className="flex justify-between petrona">
          <h4 className=" text-2xl font-md">Subtotal</h4>
          <p className="text-2xl font-md">Rs. {subtotal}</p>
        </div>
        <button
          className={`btn  text-white text-lg bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8 ${
            cartItems.length === 0 ? "disabled" : ""
          }`}
          onClick={() => handleCheckout()}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
