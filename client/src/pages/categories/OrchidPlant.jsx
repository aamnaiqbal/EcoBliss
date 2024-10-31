import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import CustomPagination from "./CustomPagination";
import { PlantContext } from "../../store/PlantContext";


const OrchidPlant = () => {
  const {orchidPlants}=useContext(PlantContext)
  const [currentPage, setCurrentPage]= useState(1);
  const [rowsPerPage, setRowsPerPage]= useState(8);
  const indexOfLastItem= currentPage * rowsPerPage;
  const indexOfFirstItem= indexOfLastItem-rowsPerPage;
  const currentItems= orchidPlants?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages= Math.ceil(orchidPlants?.length/rowsPerPage)



  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-16 pt-48 `}
    >
      <h1 className="marcellus text-lightGreen font-medium text-5xl mb-4">
        Orchid Plants
      </h1>
      <p className="petrona text-lg font-normal text-grey">
        Transform your outdoor space into a lush oasis with our selection of
        hardy and vibrant outdoor plants. From blooming flowers to resilient
        shrubs, our collection is designed to thrive in any garden, adding
        color, freshness, and life to your surroundings.
      </p>
      <div className=" flex flex-wrap gap-x-5 gap-y-20 px-auto my-12">
        {currentItems.map((item, i)=> <Card item={item} key={i} url={"Orchid"}/>)}
      </div>
      <CustomPagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
    </div>
  );
};

export default OrchidPlant;