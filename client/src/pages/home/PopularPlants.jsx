import React, { useEffect } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../redux/slices/PlantSlice";

const PopularPlants = () => {
  const dispatch = useDispatch();
  const { orchidPlants, status, error } = useSelector((state) => state.plants);

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
        <h1 className={`marcellus text-3xl md:text-6xl  text-center`}>
          Our Most Popular Plants
        </h1>
        <Slider items={orchidPlants} url="Orchid" />
      </div>
    </>
  );
};

export default PopularPlants;
