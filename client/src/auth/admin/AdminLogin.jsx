import { jwtDecode } from "jwt-decode";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/slices/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/login",
        {
          email: email.current.value,
          password: password.current.value,
        }
      );
      if (response.data.status === "success") {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        dispatch(adminLogin({ ...decoded, token }));
        toast.success("Login Successful");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="flex min-h-dvh">
      <div className="w-1/2 ">
        <img src="/images/Logo.png" alt="EcoBliss" className="h-16" />
        <div className="flex flex-col items-center justify-center h-[90%]">
          <h4 className="marcellus text-2xl md:text-5xl font-bold mb-8 md:mb-16">
            Welcome, Admin!
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
                  className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2">
        <img src="/public/images/admin/login.png" className="" />
      </div>
    </div>
  );
};

export default AdminLogin;
