import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  email: z.string().email("Valid email is required"),
  otp: z
    .string()
    .nonempty("OTP is required")
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const VendorVerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preFilledEmail = location.state?.email || "";
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: preFilledEmail, otp: "" },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/vendor/verify-otp",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/vendor/login");
      }
    } catch (error) {
      //   setError("root", {
      //     message: "This email is already taken.",
      //   });
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-2xl container min-h-screen flex">
      <div className="md:w-1/2">
        <img src="/images/loginBg.jpg" alt="Plant" className="h-full" />
      </div>
      <div className="md:w-1/2 bg-bgSky flex flex-col items-center py-20">
        <div className="heading flex items-center gap-2 mb-4 md:mb-8 ">
          <h1 className="text-2xl md:text-4xl petrona font-bold">
            Become a Vendor at
          </h1>
          <img src="/images/Logo.png" alt="EcoBliss" className="h-16" />
        </div>

        <form className="lg:w-[60%] w-[90%]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1  ">
            <label className="marcellus font-medium text-black">
              Enter email
            </label>
            <input
              type="text"
              placeholder=""
              {...register("email")}
              className="p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2"
            ></input>
            <div className="h-8 mt-[-12px]">
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <label className="marcellus font-medium text-black">
              Enter the OTP sent on your email
            </label>
            <input
              type="text"
              placeholder=""
              {...register("otp")}
              className="p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2"
            ></input>
            <div className="h-8 mt-[-12px]">
              {errors.otp && (
                <span className="text-red-500 text-sm">
                  {errors.otp?.message}
                </span>
              )}
            </div>

            <div className="mx-auto mt-4">
              <button
                className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorVerifyOTP;
