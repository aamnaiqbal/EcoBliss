import React, { useEffect } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlantCareProducts } from "../../redux/slices/PlantCareSlice";

const PlantCare = () => {
  const dispatch = useDispatch();
  const { plantCareProducts, status, error } = useSelector(
    (state) => state.plantCare
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlantCareProducts()); // Fetch products only if idle
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
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
