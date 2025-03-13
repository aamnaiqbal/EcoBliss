// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const fetchCartItems = createAsyncThunk(
//   "cart/fetchCartItems",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/v1/cart/${userId}`
//       );
//       return response.data.data.cart.items;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (
//     {
//       customerId,
//       productId,
//       productType,
//       quantity,
//       selectedSize,
//       image,
//       name,
//       price,
//       size,
//     },
//     { dispatch }
//   ) => {
//     if (!customerId) {
//       toast.error("Please login to add items to the cart.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/api/v1/cart/add", {
//         customerId,
//         productId,
//         productType,
//         quantity,
//         size: selectedSize,
//       });

//       dispatch(
//         addItemToCart({
//           productId,
//           productType,
//           quantity,
//           selectedSize,
//           image,
//           name,
//           price,
//           size,
//         })
//       );
//     } catch (err) {
//       toast.error("Failed to add item to cart.");
//     }
//   }
// );

// export const deleteCartItem = createAsyncThunk(
//   "cart/deleteCartItem",
//   async ({ customerId, productId, size }, { dispatch }) => {
//     try {
//       let url = size
//         ? `http://localhost:8000/api/v1/cart/${customerId}/${productId}/${size}`
//         : `http://localhost:8000/api/v1/cart/${customerId}/${productId}`;
//       await axios.delete(url);

//       dispatch(deleteItemFromCart({ productId, size }));
//     } catch (err) {
//       toast.error("Failed to remove item from cart.");
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//     subtotal: 0,
//   },
//   reducers: {
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//     },
//     addItemToCart: (state, action) => {
//       const {
//         productId,
//         productType,
//         quantity,
//         selectedSize,
//         image,
//         name,
//         price,
//         size,
//       } = action.payload;
//       const existingItemIndex = state.cartItems.findIndex(
//         (item) =>
//           item.productId._id.toString() === productId &&
//           item.size === selectedSize
//       );

//       if (existingItemIndex > -1) {
//         state.cartItems[existingItemIndex].quantity += quantity;
//       } else {
//         state.cartItems.push({
//           productId: { image, name, price, size, _id: productId },
//           productType,
//           quantity,
//           size: selectedSize,
//         });
//       }
//     },
//     deleteItemFromCart: (state, action) => {
//       const { productId, size } = action.payload;
//       state.cartItems = state.cartItems.filter((item) => {
//         if (size) {
//           return !(
//             item.productId._id.toString() === productId && item.size === size
//           );
//         }
//         return item.productId._id.toString() !== productId;
//       });
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchCartItems.fulfilled, (state, action) => {
//       state.cartItems = action.payload;
//     });
//   },
// });

// export const { setCartItems, addItemToCart, deleteItemFromCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/cart/${userId}`
      );
      console.log("CartItems fetched", response.data.data.cart.items);
      return response.data.data.cart.items;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch cart items"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { customerId, productId, productType, quantity, selectedSize, price },
    { rejectWithValue }
  ) => {
    console.log(
      customerId,
      productId,
      productType,
      quantity,
      selectedSize,
      price
    );
    if (!customerId) {
      toast.error("Please login to add items to the cart.");
      return rejectWithValue("User not logged in");
    }
    let response;
    try {
      if (productType == "Plant") {
        response = await axios.post("http://localhost:8000/api/v1/cart/add", {
          customerId,
          productId,
          productType,
          quantity,
          size: selectedSize,
        });
      } else {
        response = await axios.post("http://localhost:8000/api/v1/cart/add", {
          customerId,
          productId,
          productType,
          quantity,
          price,
        });
      }

      console.log("Item added", response);
      return response.data.cartItem; // Return updated cart items
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to add item to cart"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ customerId, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/cart/${customerId}/${cartItemId}`
      );
      console.log(response);

      return { cartItemId }; // Return deleted item info
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to remove item from cart"
      );
    }
  }
);

const calculateSubtotal = (cartItems) => {
  console.log("subtotal", cartItems);
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.size
      ? item.productId.size[item.size]
      : item.productId.price;
    return acc + itemPrice * item.quantity;
  }, 0);
  return subtotal;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subtotal: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
        state.subtotal = calculateSubtotal(state.cartItems);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        console.log(newItem);

        const existingItem = state.cartItems.find((item) => {
          return (
            item.productId?._id === newItem.productId?._id &&
            (item.size ? item.size === newItem.size : true) // Handle cases where size is undefined
          );
        });

        if (existingItem) {
          existingItem.quantity = newItem.quantity;
        } else {
          state.cartItems.push(newItem); // Otherwise, add new item
        }

        console.log(
          "Updated Cart",
          JSON.parse(JSON.stringify(state.cartItems))
        );
        toast.success("Item added to cart!");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const { cartItemId } = action.payload;
        console.log("cartItemId", cartItemId);
        state.cartItems = state.cartItems.filter((item) => {
          return item._id !== cartItemId;
        });
        state.subtotal = calculateSubtotal(state.cartItems);
        toast.success("Item removed from cart.");
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
