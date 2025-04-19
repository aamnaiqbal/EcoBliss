import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch order");
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
      });
  },
});

export default vendorOrderSlice.reducer;
