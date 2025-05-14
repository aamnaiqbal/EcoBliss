import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVerifiedVendors = createAsyncThunk(
  "admin/fetchVerifiedVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllVendors"
      );
      return response.data.data.vendors;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminVendorDetailsSlice = createSlice({
  name: "adminVendorDetails",
  initialState: {
    vendors: [],
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVerifiedVendors.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVerifiedVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.vendors = action.payload;
      })
      .addCase(fetchVerifiedVendors.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminVendorDetailsSlice.reducer;
