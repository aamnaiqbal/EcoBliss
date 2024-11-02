import React, { useState, useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../store/AuthContext";
import { CartContext } from "../store/CartContext";
import axios from "axios";

const CartItem = ({ item }) => {
  const { auth } = useContext(AuthContext);
  const { setCartItems, deleteCartItem , cartItems} = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const Size = item.size;
  // console.log(Size);
  const [price, setPrice] = useState(
    Size ? item.productId.size[Size] : item.productId.price
  );

  const handleIncrease = async (productId) => {
    // console.log(auth.id)
    try {
      const newQuantity= quantity+1
      const response = await axios.patch(
        `http://localhost:8000/api/v1/cart/${auth.id}/${productId}`,
        { quantity: newQuantity, size: Size}
      );
      // console.log(response)
      setQuantity(newQuantity);
      console.log(newQuantity)
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId && item.size===Size? { ...item, quantity: newQuantity} : item
        )
      );
    } catch (err) {
      console.log("There is some error updating the data.", err);
    }
  };
  const handleDecrease = async (productId) => {
    try {
      const newQuantity= quantity-1;
      const response = await axios.patch(
        `http://localhost:8000/api/v1/cart/${auth.id}/${productId}`,
        { quantity: newQuantity , size: Size}
      );
      // console.log(response)
      setQuantity(newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId  && item.size===Size? { ...item, quantity:newQuantity} : item
        )
      );
    } catch (err) {
      console.log("There is some error updating the data.", err);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4">
      <img src={item.productId.image} className="max-h-40 w-36 "></img>
      <h4 className="marcellus font-semibold lg:w-48">{item.productId.name}</h4>
      <p
        className="marcellus font-semibold  lg:w-28 "
      >
        Rs. {price * quantity}
      </p>
      {Size ? (
        <div className="border  rounded-sm h-10 w-10 bg-grey ">
          <span className="flex items-center justify-center text-white mt-[3px] petrona font-medium text-lg">
            {Size}
          </span>
        </div>
      ) : (
        <div className="w-10" />
      )}
      <div className="join flex ">
        <button
          className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
          onClick={() => quantity > 1 && handleDecrease(item.productId._id)}
        >
          -
        </button>
        <div
          className={`join-item bg-slate-200 btn-square px-4 text-center pt-2 text-xl `}
        >
          {quantity}
        </div>

        <button
          className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
          onClick={() => handleIncrease(item.productId._id)}
        >
          +
        </button>
      </div>
      <MdDelete size={24}  className="cursor-pointer text-[#990000]" onClick={()=>deleteCartItem(auth.id, item.productId._id, Size)}/>
    </div>
  );
};

export default CartItem;
