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
      <div className="max-w-screen-2xl container mx-auto relative ">
        <Swiper
          breakpoints={{
            320: {     // Very small screens like phones
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {     // Small screens like smaller phones
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {     // Tablets in portrait mode
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {     // Tablets in landscape mode
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {    // Small laptops
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
          className={`z-0 relative `}
        >
          {/* <SlideNavButtons /> */}
          {items.map((item, i) => (
            <SwiperSlide key={i} className={`mt-8 mb-8 lg:px-10  px-8 `}>
              <Card item={item} url={url}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
