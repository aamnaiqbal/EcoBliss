import React, { useState, useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, deleteCartItem } from "../redux/slices/CartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.userAuth);
  const [quantity, setQuantity] = useState(item.quantity);
  const Size = item.size;
  const [price, setPrice] = useState(() => {
    if (Size && item.productId.size && item.productId.size[Size]) {
      return item.productId.size[Size];
    }
    return item.productId.price;
  });
  console.log(item.stockQuantity);
  console.log(item);

  const handleIncrease = async (productId) => {
    try {
      const newQuantity = quantity + 1;
      const response = await axios.patch(
        `http://localhost:8000/api/v1/cart/${auth.id}/${productId}`,
        { quantity: newQuantity, size: Size }
      );
      // console.log(response)
      setQuantity(newQuantity);
      console.log(newQuantity);
      const items = cartItems.map((item) =>
        item.productId._id === productId && item.size === Size
          ? { ...item, quantity: newQuantity }
          : item
      );
      dispatch(setCartItems(items));
    } catch (err) {
      console.log("There is some error updating the data.", err);
    }
  };

  const handleDecrease = async (productId) => {
    if (quantity <= 1) return;
    try {
      const newQuantity = quantity - 1;
      await axios.patch(
        `http://localhost:8000/api/v1/cart/${auth.id}/${productId}`,
        { quantity: newQuantity, size: Size }
      );
      setQuantity(newQuantity);
      console.log(newQuantity);
      const items = cartItems.map((item) =>
        item.productId._id === productId && item.size === Size
          ? { ...item, quantity: newQuantity }
          : item
      );
      dispatch(setCartItems(items));
    } catch (err) {
      console.log("Error updating quantity:", err);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col md:flex-row my-8 border-b border-[#76767642] pb-8 gap-y-4">
      <img src={item.productId.image} className="max-h-40 w-36 "></img>
      <h4 className="marcellus font-semibold lg:w-48">{item.productId.name}</h4>
      <p className="marcellus font-semibold  lg:w-28 ">
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
      <MdDelete
        size={24}
        className="cursor-pointer text-[#990000]"
        onClick={() =>
          dispatch(
            deleteCartItem({
              customerId: auth?.id,
              cartItemId: item._id,
            })
          )
        }
      />
    </div>
  );
};

export default CartItem;
