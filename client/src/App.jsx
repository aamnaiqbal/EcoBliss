import { Outlet } from "react-router-dom";
import "./App.module.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PlantProvider } from "./store/PlantContext";
import { PlantCareProvider } from "./store/plantCareContext";
import CartProvider from "./store/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./store/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <PlantProvider>
          <PlantCareProvider>
            <CartProvider>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
              />
              <Outlet />
            </CartProvider>
          </PlantCareProvider>
        </PlantProvider>
      </AuthProvider>
    </>
  );
}

export default App;
