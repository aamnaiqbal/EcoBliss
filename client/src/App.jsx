import { Outlet } from "react-router-dom";
import "./App.module.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PlantProvider } from "./store/PlantContext";
import { PlantCareProvider } from "./store/plantCareContext";
import CartProvider from "./store/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <PlantProvider>
          <PlantCareProvider>
            <CartProvider>
              <Outlet />
            </CartProvider>
          </PlantCareProvider>
        </PlantProvider>
      </AuthProvider>
    </>
  );
}

export default App;
