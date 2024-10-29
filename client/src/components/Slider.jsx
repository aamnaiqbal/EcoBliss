import React from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

import Card from "./Card";
import SlideNavButtons from "./SlideNavButtons";

const Slider = ({items, url}) => {

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 relative ">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[Autoplay, Navigation]}
          navigation
          autoplay={
            {
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          }
          className={`z-0 relative`}
        >
          {/* <SlideNavButtons /> */}
          {items.map((item, i) => (
            <SwiperSlide key={i} className={`mt-20 mb-8 pl-12`}>
              <Card item={item} url={url}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;