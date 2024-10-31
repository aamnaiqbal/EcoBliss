import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { CartContext } from "../../store/CartContext";
import axios from "axios";

const Item = ({ item }) => {
  const { auth } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const itemSize= item.size;
  let Size;
  if(itemSize==='S') Size="Small"
  else if(itemSize==='M') Size="Medium"
  else if(itemSize==='L') Size="Large"

  // console.log(Size);
  const [price, setPrice] = useState(
    itemSize ? item.productId.size[itemSize] : item.productId.price
  );

  

  return (
    <div className="flex items-center justify-between my-8  pb-8 ">
      <img src={item.productId.image} className="h-32 w-32 rounded-md"></img>
      <div className="w-44">
      <h4 className="marcellus font-medium text-md ">{item.productId.name}</h4>
      <p className="text-sm text-grey mx-auto italic">{Size}</p>
      </div>
      <p className="font-semibold  w-16">Qty: {quantity} </p>
      <p
        className="marcellus font-medium text-md "
      >
        Rs. {price * quantity}
      </p>
      

    </div>
  );
};

export default Item;