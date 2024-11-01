import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import CustomPagination from "./CustomPagination";
import { PlantCareContext } from "../../store/plantCareContext";

const PlantCare = () => {
  const {plantCareProducts}=useContext(PlantCareContext)
  const [currentPage, setCurrentPage]= useState(1);
  const [rowsPerPage, setRowsPerPage]= useState(12);
  const indexOfLastItem= currentPage * rowsPerPage;
  const indexOfFirstItem= indexOfLastItem-rowsPerPage;
  const currentItems= plantCareProducts?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages= Math.ceil(plantCareProducts?.length/rowsPerPage)


  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-24 md:px-16 px-4 lg:pt-48 pt-24  `}
    >
      <h1 className="marcellus text-lightGreen font-medium text-5xl mb-4">
      Plant Care Accessories
      </h1>
      <p className="petrona lg:text-lg text-xl font-normal text-grey text-justify">
      From organic potting mix to all-natural fertilizer, shop essentials every plant parent needs.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-20 px-auto mx-auto  my-12 items-center justify-center">
        {currentItems.map((item, i)=> <Card item={item} key={i} url={"plantcare"}/>)}
      </div>
      <CustomPagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
    </div>
  );
};

export default PlantCare;