import React from "react";
import img1 from "/images/home/Banner/img1.png";
import img2 from "/images/home/Banner/img2.png";
import img3 from "/images/home/Banner/img3.png";
import img4 from "/images/home/Banner/img4.png";
const Banner = () => {
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-16 bg-bgSky pt-44 `}>
      <div className={`flex gap-[12px]`}>
        <div className={`w-3/4 mt-16`}>
          <h1 className="text-6xl font-normal text-black mb-8 petrona">
            Customize your home with EcoBliss - your <i>favourite</i> online nursery
          </h1>
          <p className={`text-3xl font-normal text-grey w-[70%] mb-8 marcellus`}>
            Decorate your house with best of the best plant solutions that match
            your aesthetic.
          </p>
          <button className="btn text-white text-2xl bg-green px-8 hover:bg-lightGreen rounded-2xl marcellus">
            Buy Now!
          </button>
        </div>
        <div className={`flex w-1/2 gap-4 mb-4`}>
          <div className="">
            <img src={img1} className={`mb-8 w-[90%]`}></img>
            <img src={img2}></img>
          </div>
          <div>
            <img src={img3} className={`mb-8`}></img>
            <img src={img4} className="w-[85%] ml-4"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
