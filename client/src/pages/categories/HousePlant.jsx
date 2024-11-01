import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import CustomPagination from "./CustomPagination";
import { PlantContext } from "../../store/PlantContext";

const HousePlant = () => {
  const { housePlants } = useContext(PlantContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = housePlants?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(housePlants?.length / rowsPerPage);

  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-16 pt-48 `}>
      <h1 className="marcellus text-lightGreen font-medium text-5xl mb-4">
        House Plants
      </h1>
      <p className="petrona text-lg font-normal text-grey">
        Houseplants are perfect indoor companions that add a touch of nature to
        any space. Known for their air-purifying qualities and easy maintenance,
        they bring freshness and beauty indoors, making homes feel more inviting
        and lively.
      </p>
      <div className=" flex flex-wrap gap-x-5 gap-y-20 px-auto my-12">
        {currentItems.map((item, i) => (
          <Card item={item} key={i} url={"HousePlants"} />
        ))}
      </div>
      <CustomPagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default HousePlant;