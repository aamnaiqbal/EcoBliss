import { Outlet } from "react-router-dom";
import "./App.module.css";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatComponent from "./components/Chat_component";
function App() {
  return (
    <>
      <ScrollToTop />
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
        theme="dark"
        transition:Bounce
      />
      <Outlet />
      <ChatComponent />
    </>
  );
}

export default App;
