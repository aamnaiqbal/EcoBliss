import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch plant care products
export const fetchPlantCareProducts = createAsyncThunk(
  "plantCare/fetchPlantCareProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/plantcare"
      );
      return response.data.data.products; // Returns the fetched products
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

// Create slice
const plantCareSlice = createSlice({
  name: "plantCare",
  initialState: {
    plantCareProducts: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {}, // No synchronous reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlantCareProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlantCareProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plantCareProducts = action.payload;
      })
      .addCase(fetchPlantCareProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default plantCareSlice.reducer;
