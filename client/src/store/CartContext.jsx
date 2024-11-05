import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  fetchCartItems: () => {},
  addToCart: () => {},
  deleteCartItem: () => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal]= useState(0)
  const { auth } = useContext(AuthContext);
  const navigate= useNavigate()

  useEffect(() => {
    if (auth) {
      // console.log(auth, "Cart");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/cart/${auth.id}`
          );
          // console.log(response);
          // console.log(response.data.data.cart.items);
          setCartItems(response.data.data.cart.items);
          // console.log(cartItems)
        } catch (err) {
          console.log("There is some error fetching the data.", err);
        }
      };
      fetchData();
    }
  }, [auth]);

  const addToCart = async (
    customerId,
    productId,
    productType,
    quantity,
    selectedSize,
    image,
    name,
    size,
    price
  ) => {
    const req = { customerId, productId, productType, quantity, size: selectedSize };
    if(!auth?.id){
      toast.error("Please login to add item to the cart.")
      setTimeout(()=>{
        return navigate("/user/login")
      }, 1700)
      return;
    }
    // console.log("selected SIze", selectedSize)
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { customerId, productId, productType, quantity, size: selectedSize }
      );
      // console.log(response);
      // console.log("item has added to cart.");
      
      if (cartItems.length==0) {
        if (size) {
          cartItems.push({
            productId: { image, name, size, _id: productId },
            productType,
            quantity,
            size: selectedSize,
          });
        }else{
            cartItems.push({productId: {image, name,price, _id: productId}, productType, quantity})
        }
      }else {
        const itemIndex=cartItems.findIndex((item)=> item.productId._id.toString()===productId && item.size === selectedSize);
        if (itemIndex > -1) {

            cartItems[itemIndex].quantity += quantity;
          } else {
            if(size){
                cartItems.push({
                    productId: { image, name, size, _id: productId },
                    productType,
                    quantity,
                    size: selectedSize,
                  });
            }else{
                cartItems.push({productId: {image, name,price, _id: productId}, productType, quantity});
            }
          }
      }
      // console.log("CartItems: ", cartItems);
    } catch (err) {
      console.log("There is some error adding data to the cart.", err);
    }
  };


  const deleteCartItem = async (customerId, productId, size) => {
    try {
      let url;
      if (size)
        url = `http://localhost:8000/api/v1/cart/${customerId}/${productId}/${size}`;
      else url = `http://localhost:8000/api/v1/cart/${customerId}/${productId}`;
      const response = await axios.delete(url);
      console.log(response)
      console.log(cartItems);
      if(response.status===204){
        setCartItems((prevItems) =>
            prevItems.filter((item) => {
                // When size is provided, both productId and size must match to remove the item.
                if (size) {
                    return !(item.productId._id.toString() === productId && item.size === size);
                }
                // If no size is provided, only match by productId to remove the item.
                return item.productId._id.toString() !== productId;
            })
        );
      }else{
        console.error("Failed to delete item: ", response);
      }

    } catch (err) {
      console.log("There is some error removing the item from the cart.", err);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        deleteCartItem,
        subtotal,
        setSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
