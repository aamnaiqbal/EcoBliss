import React from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import Card from "./Card";
import SlideNavButtons from "./SlideNavButtons";

const Slider = ({ items, url }) => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto relative ">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[Autoplay, Navigation]}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className={`z-0 relative px-4`}
        >
          {/* <SlideNavButtons /> */}
          {items.map((item, i) => (
            <SwiperSlide key={i} className={`mt-8 mb-8 px-[42px] `}>
              <Card item={item} url={url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
