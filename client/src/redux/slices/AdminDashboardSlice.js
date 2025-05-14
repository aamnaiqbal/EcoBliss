import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL - customize as needed
const BASE_URL = "http://localhost:8000/api/v1/admin";

// Thunks
export const fetchDashboardStats = createAsyncThunk(
  "adminDashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const [vendorsRes, plantsRes, customersRes, salesRes, visitorsRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/getTotalVendors`),
          axios.get(`${BASE_URL}/getTotalPlants`),
          axios.get(`${BASE_URL}/getTotalCustomers`),
          axios.get(`${BASE_URL}/getTotalSales`),
          axios.get("http://localhost:8000/api/v1/vendor/getTotalVisitors"),
        ]);
      // console.log(vendorsRes, plantsRes, customersRes, salesRes);

      return {
        totalVendors: vendorsRes.data.data,
        totalPlants: plantsRes.data.data,
        totalCustomers: customersRes.data.data,
        totalSales: salesRes.data.data,
        totalVisitors: visitorsRes.data.data,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);
export const fetchTopSellingCategories = createAsyncThunk(
  "admin/fetchTopSellingCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getTopSellingCategories"
      );
      const formatted = res.data.data.map((item) => ({
        category: item._id,
        sold: item.totalSold,
      }));
      return formatted;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    totalVendors: 0,
    totalPlants: 0,
    totalCustomers: 0,
    totalVisitors: 0,
    totalSales: {
      totalProductRevenue: 0,
      totalShippingRevenue: 0,
      topSellingCategories: [],
      totalRevenue: 0,
    },
    topSellingCategories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalVendors = action.payload.totalVendors;
        state.totalPlants = action.payload.totalPlants;
        state.totalCustomers = action.payload.totalCustomers;
        state.totalSales = action.payload.totalSales;
        state.totalVisitors = action.payload.totalVisitors;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTopSellingCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSellingCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.topSellingCategories = action.payload;
      })
      .addCase(fetchTopSellingCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;
