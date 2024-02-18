import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import ScrollToTop from "react-scroll-up";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookMsg from "./components/FacebookMsg/FacebookMsg";

function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <div className=" ">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
      <FacebookMsg />
      {/* <ScrollToTop showUnder={160}>
        <span className="text-4xl text-blue-600  print:hidden hover:text-sky-600">
          <BsArrowUpCircleFill className="animate-bounce"></BsArrowUpCircleFill>
        </span>
      </ScrollToTop> */}
    </div>
  );
}

export default App;
