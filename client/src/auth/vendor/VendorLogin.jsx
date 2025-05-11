import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { vendorLogin } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { jwtDecode } from "jwt-decode";

const VendorLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/vendor/login",
        {
          email: email.current.value,
          password: password.current.value,
        }
      );
      console.log(response);

      if (response.data.status === "success") {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        const vendorInfo = response.data.data.vendor;
        // Dispatch login action to Redux
        dispatch(vendorLogin({ ...decoded, token, ...vendorInfo }));

        toast.success("Login Successful");
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Error logging in:", error);
      //   if (
      //     error.response?.data?.message ==
      //     "Email not verified. Please verify OTP."
      //   ) {
      //     navigate("/vendor/verify-otp");
      //   }
      // }
      console.log(error.response.data?.message);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.message ===
          "Email not verified. Please verify OTP."
      ) {
        console.log("Hello");
        navigate("/vendor/verify-otp");
      } else {
        // Handle other errors
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container min-h-screen flex">
      <div className="md:w-1/2">
        <img src="/images/loginBg.jpg" alt="Plant" className="h-full" />
      </div>
      <div className="md:w-1/2 bg-bgSky flex flex-col items-center py-20">
        <img src="/images/Logo.png" alt="EcoBliss" className="h-16" />
        <div className="flex flex-col items-center justify-center h-[90%]">
          <h4 className="marcellus text-2xl md:text-5xl font-bold mb-8 md:mb-16">
            Welcome, Vendor!
          </h4>
          <form onSubmit={handleSubmit} className="w-[75%]">
            <div className="flex flex-col gap-8  ">
              <input
                type="text"
                ref={email}
                placeholder="Email"
                name="email"
                required
                className="p-[10px] border border-lightGreen outline-none rounded-md "
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={password}
                required
                className="p-[10px] border border-lightGreen outline-none rounded-md"
              />

              <div className="mx-auto ">
                <button
                  type="submit"
                  className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-16 px-12`}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <p className="mt-8 text-lg">
            Don't have an account?{" "}
            <Link
              to="/vendor/signup"
              className="text-green underline italic font-medium"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
