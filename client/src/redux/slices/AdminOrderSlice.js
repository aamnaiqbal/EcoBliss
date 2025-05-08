import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ filter }, { rejectWithValue }) => {
    try {
      let url = `http://localhost:8000/api/v1/order`;
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await axios.get(url);
      // console.log(response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch order");
    }
  }
);

export const updateOrderShipmentRequest = createAsyncThunk(
  "adminOrders/updateOrderShipmentRequest",
  async ({ orderId, subOrderId, vehicleType }, { rejectWithValue }) => {
    console.log(orderId, subOrderId, vehicleType);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/order/acceptOrderShipmentRequest/${orderId}/${subOrderId}`,
        { vehicleType }
      );
      console.log(response);
      const data = response.data.data;
      return { orderId, subOrderId, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to accept the order shipment request."
      );
    }
  }
);
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateOrderShipmentRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderShipmentRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { orderId, subOrderId, data } = action.payload;
        const updatedOrders = state.orders.map((order) => {
          console.log(typeof subOrderId, typeof order.subOrderId);
          if (order.orderId == orderId && order.subOrderId == subOrderId) {
            console.log("Conition becomes true");
            return {
              ...order,
              status: data.status,
              vehicleType: data.vehicleType,
              shipmentAcceptedAt: data.shipmentAcceptedAt,
            };
          }
          return order;
        });
        state.orders = updatedOrders;
        toast.success("Order shipment request accepted successfully.");
      })
      .addCase(updateOrderShipmentRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
