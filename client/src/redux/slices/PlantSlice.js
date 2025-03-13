import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URLs
const PLANT_API = "http://localhost:8000/api/v1/plant";
const POPULAR_PLANTS_API = "http://localhost:8000/api/v1/plant/popular";

// Async Thunk to fetch plant data
export const fetchPlants = createAsyncThunk(
  "plants/fetchPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(PLANT_API);
      const data = response.data.data.plants;
      console.log(response);

      return {
        outdoorPlants: data.filter((item) => item.category === "Outdoor"),
        orchidPlants: data.filter((item) => item.category === "Orchid"),
        housePlants: data.filter((item) => item.category === "HousePlants"),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch plant data"
      );
    }
  }
);

// Async Thunk to fetch popular plants
export const fetchPopularPlants = createAsyncThunk(
  "plants/fetchPopularPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POPULAR_PLANTS_API);
      return response.data.data.popularPlants;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch popular plants"
      );
    }
  }
);

// Plant Slice
const plantSlice = createSlice({
  name: "plants",
  initialState: {
    orchidPlants: [],
    outdoorPlants: [],
    housePlants: [],
    popularPlants: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orchidPlants = action.payload.orchidPlants;
        state.outdoorPlants = action.payload.outdoorPlants;
        state.housePlants = action.payload.housePlants;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPopularPlants.fulfilled, (state, action) => {
        state.popularPlants = action.payload;
      })
      .addCase(fetchPopularPlants.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default plantSlice.reducer;
