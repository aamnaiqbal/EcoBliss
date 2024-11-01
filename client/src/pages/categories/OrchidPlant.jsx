import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import CustomPagination from "./CustomPagination";
import { PlantContext } from "../../store/PlantContext";

const OrchidPlant = () => {
  const { orchidPlants } = useContext(PlantContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = orchidPlants?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orchidPlants?.length / rowsPerPage);

  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-16 pt-48 `}>
      <h1 className="marcellus text-lightGreen font-medium text-5xl mb-4">
        Orchid Plants
      </h1>
      <p className="petrona text-lg font-normal text-grey">
        Orchids are exotic plants famous for their stunning, long-lasting
        flowers. With a wide variety of colors and unique petal shapes, they add
        elegance and sophistication, making them a favorite choice for both
        beginners and experienced plant enthusiasts.
      </p>
      <div className=" flex flex-wrap gap-x-5 gap-y-20 px-auto my-12">
        {currentItems.map((item, i) => (
          <Card item={item} key={i} url={"Orchid"} />
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

export default OrchidPlant;
