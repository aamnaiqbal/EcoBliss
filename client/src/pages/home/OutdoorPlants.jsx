import React, { useContext } from "react";
import Slider from "../../components/Slider";
import { PlantContext } from "../../store/PlantContext";

const OutdoorPlants = () => {
  const {outdoorPlants}= useContext(PlantContext)
 
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative py-12">
        <h1 className={`marcellus text-6xl text-center`}>
        Best Outdoor Plants
        </h1>
        <Slider items={outdoorPlants} url="Outdoor"/>
      </div>
    </>
  );
};

export default OutdoorPlants;
