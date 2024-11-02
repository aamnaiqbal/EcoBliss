import React from "react";
import img1 from "/images/home/Banner/img1.png";
import img2 from "/images/home/Banner/img2.png";
import img3 from "/images/home/Banner/img3.png";
import img4 from "/images/home/Banner/img4.png";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className={`max-w-screen-2xl container mx-auto bg-bgSky xl:px-24 md:px-16 px-4 lg:pt-48 pt-24 pb-8 lg:pb-4`}>
      <div className={`flex lg:gap-[12px] flex-col lg:flex-row`}>
        <div className={`lg:w-3/4 mt-4`}>
          <h1 className="md:text-6xl font-normal text-black mb-8 petrona text-3xl">
            Customize your home with EcoBliss - your <i>favourite</i> online nursery
          </h1>
          <p className={`lg:text-3xl text-xl font-normal text-grey lg:w-[70%] mb-8 marcellus`}>
            Decorate your house with best of the best plant solutions that match
            your aesthetic.
          </p>
          <Link to="/HousePlants" className="flex  justify-center  md:justify-start"><button className="btn text-white text-2xl bg-green px-8 hover:bg-lightGreen rounded-2xl marcellus">
            Buy Now!
          </button></Link>
        </div>
        <div className={`lg:flex w-1/2 gap-4 mb-4 hidden`}>
          <div className="">
            <img src={img1} className={`mb-4 w-[90%]`}></img>
            <img src={img2} className=""></img>
          </div>
          <div>
            <img src={img3} className={`mb-4`}></img>
            <img src={img4} className="w-[85%] ml-4"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
