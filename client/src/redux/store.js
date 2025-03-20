import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";
import buyerPlantReducer from "./slices/BuyerPlantSlice";
import plantCareReducer from "./slices/PlantCareSlice";
import productReducer from "./slices/ProductSlice";
import vendorPlantReducer from "./slices/VendorPlantSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    buyerPlants: buyerPlantReducer,
    vendorPlants: vendorPlantReducer,
    plantCare: plantCareReducer,
    product: productReducer,
  },
});

export default store;
