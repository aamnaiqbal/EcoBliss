import React , {useContext} from "react";

import { PlantContext } from "../../store/PlantContext";
import Slider from "../../components/Slider";



const PopularPlants = () => {
  const {popularPlants}= useContext(PlantContext)



  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative py-12">
        <h1 className={`marcellus text-3xl md:text-6xl  text-center`}>
          Our Most Popular Plants
        </h1>
        <Slider items={popularPlants} url="Orchid"/>
        
      </div>
    </>
  );
};

export default PopularPlants;
