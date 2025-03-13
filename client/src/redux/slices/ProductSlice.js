import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch the product (plant or plant care)
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ id, type }) => {
    const url =
      type === "PlantCare"
        ? `http://localhost:8000/api/v1/plantcare/${id}`
        : `http://localhost:8000/api/v1/plant/${id}`;

    const response = await axios.get(url);
    return response.data.data.product || response.data.data.plant;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
