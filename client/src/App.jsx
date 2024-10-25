import { Outlet } from "react-router-dom";
import "./App.module.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PlantContextProvider } from "./context/PlantContext";
import { PlantCareContextProvider } from "./context/plantCareContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <PlantContextProvider>
        <PlantCareContextProvider>
          <Outlet />
        </PlantCareContextProvider>
      </PlantContextProvider>
      <Footer />
    </>
  );
}

export default App;
