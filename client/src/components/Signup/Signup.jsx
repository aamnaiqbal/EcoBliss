import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useRef, useContext } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import {Link} from "react-router-dom"

import Bg from "/images/loginBg.jpg";

import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/signup",
        {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          confirmPassword: confirmPassword.current.value,
        }
      );
      if (response.data.status === "success") {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        setAuth(decoded);

        cookies.set("jwt_authorization", token, {
          expires: new Date(decoded.exp * 1000),
        });
        alert("Registeration successful");
        console.log(auth);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.error("There was an error inserting the data!", e);
      alert("There was an error inserting the data!");
    }
  };

  
  return (
    <div className={styles.backgroundImageContainer}>
      {/* Your sign-up form or other content goes here */}
      <div className="bg-[#FFFFFFBA] flex justify-center items-center flex-col mx-auto my-16 py-12 rounded-2xl petrona w-[60%]">
        <h2 className="text-4xl font-semibold mb-8">Signup</h2>
        <form onSubmit={signupUser} className="w-[60%]">
        <div className="flex flex-col gap-4  ">
          <input
            type="text"
            name="fullName"
            ref={name}
            placeholder="Full Name"
            required
            className="p-[10px] border border-lightGreen outline-none rounded-md bg-white"
          ></input>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            ref={confirmPassword}
            required
            className="p-[10px] border border-lightGreen outline-none rounded-md"
          />
          <div className="mx-auto ">
            <button type="submit" className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}>
              Sign Up
            </button>
          </div>
        </div>
        </form>
        <p className="mt-8 text-lg font-medium">Already have an account? <Link to="/user/login" className="text-green underline italic">Login</Link></p>
      </div>
    </div>
  );
}