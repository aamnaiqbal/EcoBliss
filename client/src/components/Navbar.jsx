import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "/images/Logo.png"

const Navbar = () => {
  return (
    <div className={`fixed top-0 left-0 right-0 bg-slate-400 z-20`}>
      <header
        className={`max-w-screen-2xl container mx-auto border-b-[2px] border-[#76767642] marcellus font-medium`}
      >
        <div className="navbar bg-base-100 xl:px-16">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                {/* <li>
                  <Link to="/">Login</Link>
                </li> */}
                <li>
                  <a>Categories</a>
                  <ul className="p-2">
                    <li>
                      <a>Houseplants</a>
                    </li>
                    <li>
                      <a>Outdoor</a>
                    </li>
                    <li>
                      <a>Orchids</a>
                    </li>
                    <li>
                      <a>Gifts</a>
                    </li>
                    <li>
                      <a>Plant Care</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <Link to="/" className="text-xl"><img src={Logo} alt="EcoBliss" className="h-12"/></Link>
          </div>
          <div className="navbar-end">
            <ul className="menu menu-horizontal px-1 hidden lg:flex text-lg">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/user/login">Login</Link>
              </li>
            </ul>
            {/* <IoPersonCircleSharp size={30} className={`mx-4 hover:cursor-pointer`} /> */}
          </div>
        </div>
      </header>
      <header className={`max-w-screen-2xl container mx-auto marcellus font-medium border-b-[2px] border-[#76767642]`}>
        <div className="navbar bg-base-100 xl:px-16 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-28 mx-auto text-lg">
            <li>
              <Link to="/" className={`hover:text-green hover:bg-lightGreen`}>Houseplants</Link>
            </li>
            <li>
              <Link to="/Outdoor" className={`hover:text-green hover:bg-lightGreen`}>Outdoor</Link>
            </li>
            <li>
              <Link to="/Orchid" className={`hover:text-green hover:bg-lightGreen`}>Orchids</Link>
            </li>
            <li>
              <Link to="/" className={`hover:text-green hover:bg-lightGreen`}>Gifts</Link>
            </li>
            <li>
              <Link to="/plantcare" className={`hover:text-green hover:bg-lightGreen`}>Plant Care</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
