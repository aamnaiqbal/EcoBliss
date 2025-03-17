import React, { useEffect } from "react";
import Slider from "../../components/Slider";

import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../redux/slices/BuyerPlantSlice";

const OutdoorPlants = () => {
  const dispatch = useDispatch();
  const { outdoorPlants, status, error } = useSelector(
    (state) => state.buyerPlants
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlants());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative py-12">
        <h1 className={`marcellus md:text-6xl text-center text-3xl`}>
          Best Outdoor Plants
        </h1>
        <Slider items={outdoorPlants} url="Outdoor" />
      </div>
    </>
  );
};

export default OutdoorPlants;
