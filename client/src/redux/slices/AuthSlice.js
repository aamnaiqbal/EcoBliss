import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const cookies = new Cookies();

// Retrieve token from cookies
const userToken = cookies.get("jwt_authorization");
const vendorToken = cookies.get("jwt_vendor_authorization");
const adminToken = cookies.get("jwt_admin_authorization");
let initialUserAuth = null;
let initialVendorAuth = null;
let initialAdminAuth = null;
// Decode token if available
if (userToken) {
  try {
    initialUserAuth = jwtDecode(userToken);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

if (vendorToken) {
  try {
    initialVendorAuth = jwtDecode(vendorToken);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

if (adminToken) {
  try {
    initialAdminAuth = jwtDecode(adminToken);
  } catch (error) {
    console.log("Failed to decode token: ", error);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: initialUserAuth, // Store decoded token
    vendorAuth: initialVendorAuth,
    adminAuth: initialAdminAuth,
    lastPage: null, // Track last visited page
  },
  reducers: {
    userLogin: (state, action) => {
      state.userAuth = action.payload;
      console.log(JSON.parse(JSON.stringify(state.userAuth)));
      cookies.set("jwt_authorization", action.payload.token, { path: "/" }); // Save token in cookies
    },
    userLogout: (state) => {
      state.userAuth = null;
      cookies.remove("jwt_authorization");
      toast.success("Logged out");
    },
    vendorLogin: (state, action) => {
      state.vendorAuth = action.payload;
      console.log(JSON.parse(JSON.stringify(state.vendorAuth)));
      cookies.set("jwt_vendor_authorization", action.payload.token); // Save token in cookies
    },
    vendorLogout: (state) => {
      state.auth = null;
      cookies.remove("jwt_vendor_authorization");
      toast.success("Logged out");
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    adminLogin: (state, action) => {
      state.adminAuth = action.payload;
      console.log(JSON.parse(JSON.stringify(state.adminAuth)));
      cookies.set("jwt_admin_authorization", action.payload.token);
    },
    adminLogout: (state) => {
      state.auth = null;
      cookies.remove("jwt_admin_authorization");
      toast.success("Logged out");
    },
  },
});

export const {
  userLogin,
  userLogout,
  vendorLogout,
  vendorLogin,
  setLastPage,
  adminLogin,
  adminLogout,
} = authSlice.actions;
export default authSlice.reducer;
