import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const fetchPlants = createAsyncThunk(
  "plants/fetchPlants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/vendor/plants/671a40b179ecced09c18b59c"
      );
      // console.log("Response", response.data.data.plants);
      return response.data.data.plants;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch plant data"
      );
    }
  }
);

export const deletePlant = createAsyncThunk(
  "plant/delete",
  async ({ vendorId, plantId }, { rejectWithValue }) => {
    console.log("vendorId", vendorId);
    console.log("plantId", plantId);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/vendor/plants/${plantId}/${vendorId}`
      );
      console.log(response);
      return { plantId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete plant data"
      );
    }
  }
);

export const addPlant = createAsyncThunk(
  "vendor/addPlant",
  async (formData, { rejectWithValue }) => {
    console.log([...formData]);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/plant",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let browser handle it
          },
        }
      );
      console.log(response);
      return response.data.data.plant;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vendorPlantSlice = createSlice({
  name: "vendorPlants",
  initialState: {
    plants: [],
    status: "idle",
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
        state.plants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plants.push(action.payload);
        toast.success("Plant added to the list");
      })
      .addCase(addPlant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add Plant");
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { plantId } = action.payload;
        state.plants = state.plants.filter((item) => {
          return item._id !== plantId;
        });
        console.log(action.payload);
        toast.success("Plant deleted from the list");
      })
      .addCase(deletePlant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to delete Plant");
      });
  },
});

export default vendorPlantSlice.reducer;
