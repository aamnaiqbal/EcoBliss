import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";
import buyerPlantReducer from "./slices/BuyerPlantSlice";
import plantCareReducer from "./slices/PlantCareSlice";
import productReducer from "./slices/ProductSlice";
import vendorPlantReducer from "./slices/VendorPlantSlice";
import adminOrderReducer from "./slices/AdminOrderSlice";
import vendorOrderReducer from "./slices/vendorOrderSlice";
import adminDashboardReducer from "./slices/AdminDashboardSlice";
import vendorDashboardReducer from "./slices/VendorDashboardSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    buyerPlants: buyerPlantReducer,
    vendorPlants: vendorPlantReducer,
    plantCare: plantCareReducer,
    product: productReducer,
    vendorOrders: vendorOrderReducer,
    adminOrders: adminOrderReducer,
    adminDashboard: adminDashboardReducer,
    vendorDashboard: vendorDashboardReducer,
  },
});

export default store;
