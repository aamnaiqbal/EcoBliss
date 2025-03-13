import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";
import plantReducer from "./slices/PlantSlice";
import plantCareReducer from "./slices/PlantCareSlice";
import productReducer from "./slices/ProductSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    plants: plantReducer,
    plantCare: plantCareReducer,
    product: productReducer,
  },
});

export default store;
