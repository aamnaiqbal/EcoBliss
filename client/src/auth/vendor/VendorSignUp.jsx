import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Full name is required field." })
    .min(3, "Full name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Full name must contains only letters and spaces."),
  email: z
    .string()
    .nonempty({ message: "Email is required field." })
    .email("Invalid email format"),
  phoneNo: z
    .string()
    .nonempty({ message: "Phone number is required field." })
    .length(11, "Phone number must be exactly 11 digits long.")
    .regex(
      /^03\d{9}$/,
      "Phone number must starts with 03 and contain Only numbers."
    ),
  password: z
    .string()
    .nonempty({ message: "Password is required field." })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")
    .regex(/\d/, "Password must contain at least one number"),
  cnic: z
    .string()
    .nonempty({ message: "CNIC is required field." })
    .length(13, "CNIC must be 13 digits long")
    .regex(/^\d+$/, "CNIC must contain Only numbers"),
  bankAccountNo: z
    .string()
    .nonempty({ message: "Bank account number is required field.." })
    .regex(/^\d+$/, "Account number must contain Only numbers")
    .min(6, "Account number must be atleat 6 digits long")
    .max(20, "Account number must not contain more than 20 digits"),
  IBAN: z
    .string()
    .nonempty({ message: "IBAN is required field." })
    .regex(/^PK\d{2}[A-Z]{4}\d{16}$/, "Invalid IBAN"),
  nurseryName: z
    .string()
    .nonempty({ message: "Nursery name is required field." })
    .min(3, "Nursery name must be at least 3 characters long"),
  address: z.string().nonempty({ message: "Please provide address" }),
});

const VendorSignup = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const nextStep = async () => {
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = ["fullName", "email", "password", "phoneNo"];
    } else if (step === 2) {
      fieldsToValidate = ["cnic", "bankAccountNo", "IBANno"];
    } else if (step === 3) {
      fieldsToValidate = ["nurseryName", "address"];
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prevStep) => prevStep + 1);
  };

  const onSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken.",
      });
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
          {step === 1 && (
            <div className="flex flex-col gap-1 ">
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2"
              ></input>
              <div className="h-8 mt-[-12px] ">
                {errors.fullName && (
                  <span className="text-red-500 text-sm">
                    {errors.fullName?.message}
                  </span>
                )}
              </div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNo")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.phoneNo && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNo?.message}
                  </span>
                )}
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="mx-auto ">
                <button
                  className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-1   ">
              <input
                type="text"
                placeholder="CNIC"
                {...register("cnic")}
                className="p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2"
              ></input>
              <div className="h-8 mt-[-12px]">
                {errors.cnic && (
                  <span className="text-red-500 text-sm">
                    {errors.cnic?.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Bank Account Number"
                {...register("bankAccountNo")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.bankAccountNo && (
                  <span className="text-red-500 text-sm">
                    {errors.bankAccountNo?.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="IBAN Number"
                {...register("IBANno")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.IBANno && (
                  <span className="text-red-500 text-sm">
                    {errors.IBANno?.message}
                  </span>
                )}
              </div>
              <div className="mx-auto ">
                <button
                  className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-1  ">
              <label className="marcellus font-medium text-black">
                Set up a name for your nursery
              </label>
              <input
                type="text"
                placeholder="Your Nursery Name"
                {...register("nurseryName")}
                className="p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2"
              ></input>
              <div className="h-8 mt-[-12px]">
                {errors.nurseryName && (
                  <span className="text-red-500 text-sm">
                    {errors.nurseryName?.message}
                  </span>
                )}
              </div>
              <label className="marcellus text-black">
                Provide an address for your business
              </label>
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
                className="p-[10px] border border-lightGreen outline-none rounded-md mb-2"
              />
              <div className="h-8 mt-[-12px]">
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address?.message}
                  </span>
                )}
              </div>

              <div className="mx-auto mt-4">
                <button
                  className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;
