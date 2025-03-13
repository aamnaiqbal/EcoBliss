import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const cookies = new Cookies();

// Retrieve token from cookies
const token = cookies.get("jwt_authorization");
let initialAuth = null;

// Decode token if available
if (token) {
  try {
    initialAuth = jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: initialAuth, // Store decoded token
    lastPage: null, // Track last visited page
  },
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
      console.log(JSON.parse(JSON.stringify(state.auth)));
      cookies.set("jwt_authorization", action.payload.token, { path: "/" }); // Save token in cookies
    },
    logout: (state) => {
      state.auth = null;
      cookies.remove("jwt_authorization");
      toast.success("Logged out");
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
  },
});

export const { login, logout, setLastPage } = authSlice.actions;
export default authSlice.reducer;
