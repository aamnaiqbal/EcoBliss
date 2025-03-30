import React, { useRef } from "react";

const AdminLogin = () => {
  const email = useRef(null);
  const password = useRef(null);
  return (
    <div className="flex min-h-dvh">
      <div className="w-1/2 ">
        <img src="/images/Logo.png" alt="EcoBliss" className="h-16" />
        <div className="flex flex-col items-center justify-center h-[90%]">
          <h4 className="marcellus text-2xl md:text-5xl font-bold mb-8 md:mb-16">
            Welcome, Admin!
          </h4>
          <form className="w-[75%]">
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
