import { React } from "react";
import { useSwiper } from "swiper/react";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function SlideNavButtons() {
  const swiper = useSwiper();

  return (
    <div className={`flex items-center justify-center gap-4 mt-4 absolute top-0 right-8 z-50`}>
      <button
        onClick={() => {
          swiper.slidePrev();
          console.log("Prev");
        }}
        className="btn rounded-full p-2 ml-5"
      >
        <IoIosArrowBack className="h-8 w-8 p-1" />
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
          console.log("next")
        }}
        className="btn rounded-full ml-5 bg-green p-2 text-white hover:bg-lightGreen hover:text-green"
      >
        <IoIosArrowForward className="h-8 w-8 p-1" />
      </button>
    </div>
  );
}
