import React, { useContext } from "react";
import Slider from "../../components/Slider"

import { PlantCareContext } from "../../store/plantCareContext";

const PlantCare = () => {
  const {plantCareProducts}= useContext(PlantCareContext);
  // const products= plantCareProducts.filter((item)=> item.popular && item.popular!== false)


  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative py-12">
        <h1 className={`marcellus md:text-6xl text-3xl  text-center`}>
        Plant Care
        </h1>
        <Slider items={plantCareProducts} url="plantcare"></Slider>
      </div>
    </>
  );
};

export default PlantCare;
