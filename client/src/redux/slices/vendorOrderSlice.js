import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchVendorOrders = createAsyncThunk(
  "vendorOrders/fetchVendorOrders",

  async (vendorId, { rejectWithValue }) => {
    console.log(vendorId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/order/${vendorId}`
      );
      console.log(response);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch order");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "vendorOrders/updateOrderStatus",
  async ({ vendorId, status, orderId }, { rejectWithValue }) => {
    console.log(vendorId, status, orderId);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/order/updateOrderStatus/${orderId}/${vendorId}`,
        { status }
      );
      console.log(response);
      return { orderId, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update order status"
      );
    }
  }
);
const vendorOrderSlice = createSlice({
  name: "vendorOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { orderId, status } = action.payload;
        const updatedOrders = state.orders.map((order) => {
          if (order._id == orderId) {
            const updatedSubOrders = order.subOrders.map((subOrder, index) => {
              if (index === 0) {
                return { ...subOrder, status };
              }
              return subOrder;
            });
            return { ...order, subOrders: updatedSubOrders };
          }
          return order;
        });
        state.orders = updatedOrders;
        toast.success("Order status updated successfully.");
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default vendorOrderSlice.reducer;
