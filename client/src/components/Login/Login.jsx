import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import styles from "../Signup/Signup.module.css";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { setAuth, auth, lastPage, setLastPage } = useContext(AuthContext);
  const cookies = new Cookies(); //initializing the cookies

  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: email.current.value,
          password: password.current.value,
        }
      );
      console.log(response);

      if (response.data.status === "success") {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        // console.log(decoded)
        setAuth(decoded);

        //setCookie
        cookies.set("jwt_authorization", token, {
          expires: new Date(decoded.exp * 1000),
        });
        // alert("Login successful");
        toast.success("Login Successful");
        // console.log(auth);
        navigate(lastPage || "/");
        setLastPage(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error("Error logging in:", error);
      // alert("An error occurred while logging in. Please try again.");
    }
  };
  return (
    <div className={styles.backgroundImageContainer}>
      <div className="bg-[#FFFFFFBA] flex justify-center items-center flex-col mx-auto  py-12 rounded-2xl petrona md:w-[60%] w-[90%]">
        <h2 className="text-4xl font-semibold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="lg:w-[60%] w-[90%]">
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
        <p className="mt-8 text-lg font-medium">
          Don't have an account?{" "}
          <Link to="/user/signup" className="text-green underline italic">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
