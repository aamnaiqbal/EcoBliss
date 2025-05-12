import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1/vendor"; // Adjust as needed

// Thunks
export const fetchVendorRevenue = createAsyncThunk(
  "vendorDashboard/fetchVendorRevenue",
  async (vendorId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/${vendorId}/revenue`);
      const totalRevenue = res.data.data.totalRevenue;
      const totalOrders = res.data.data.totalOrders;
      return { totalRevenue, totalOrders };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchVendorCustomers = createAsyncThunk(
  "vendorDashboard/fetchVendorCustomers",
  async (vendorId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_BASE}/${vendorId}/getCustomersByVendor`
      );
      // console.log(res);
      const uniqueCustomerCount = res.data.data.uniqueCustomerCount;
      return { uniqueCustomerCount };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchTotalVisitors = createAsyncThunk(
  "vendorDashboard/fetchTotalVisitors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/getTotalVisitors`);
      // console.log(res);
      const visitors = res.data.data;
      return { visitors };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const vendorDashboardSlice = createSlice({
  name: "vendorDashboard",
  initialState: {
    totalRevenue: null,
    totalOrders: null,
    customers: null,
    visitors: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetVendorDashboardState: (state) => {
      state.totalRevenue = null;
      state.totalOrders = null;
      state.customers = null;
      state.visitors = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Revenue
      .addCase(fetchVendorRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchVendorRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Customers
      .addCase(fetchVendorCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.uniqueCustomerCount;
      })
      .addCase(fetchVendorCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Visitors
      .addCase(fetchTotalVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload.visitors;
      })
      .addCase(fetchTotalVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorDashboardSlice.reducer;
export const { resetVendorDashboardState } = vendorDashboardSlice.actions;
