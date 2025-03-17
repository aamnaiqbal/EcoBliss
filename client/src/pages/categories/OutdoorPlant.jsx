import React, { useEffect, useState, useContext } from "react";
import Card from "../../components/Card";
import CustomPagination from "./CustomPagination";

import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../redux/slices/BuyerPlantSlice";

const OutdoorPlant = () => {
  const dispatch = useDispatch();
  const { outdoorPlants, status, error } = useSelector(
    (state) => state.buyerPlants
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = outdoorPlants?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(outdoorPlants?.length / rowsPerPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlants());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-16 xxl:px-24 px-4 lg:pt-48 pt-24`}
    >
      <h1 className="marcellus text-lightGreen font-medium text-5xl mb-4">
        Outdoor Plants
      </h1>
      <p className="petrona lg:text-lg text-xl font-normal text-grey text-justify">
        Transform your outdoor space into a lush oasis with our selection of
        hardy and vibrant outdoor plants. From blooming flowers to resilient
        shrubs, our collection is designed to thrive in any garden, adding
        color, freshness, and life to your surroundings.
      </p>
      <div className=" flex flex-wrap gap-x-5 gap-y-20 px-auto mx-auto  my-12 items-center justify-center">
        {currentItems.map((item, i) => (
          <Card item={item} key={i} url={"Outdoor"} />
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

export default OutdoorPlant;
