import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PlantCareContext = createContext();

export const PlantCareProvider = ({ children }) => {
  const [plantCareProducts, setPlantCareProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/plantcare"
        );
        setPlantCareProducts(response.data.data.products);
      } catch (err) {
        console.log("Some error occured fetching the data", err);
      }
    };
    fetchData();
  }, []);
  return (
    <PlantCareContext.Provider value={{ plantCareProducts }}>
      {children}
    </PlantCareContext.Provider>
  );
};
