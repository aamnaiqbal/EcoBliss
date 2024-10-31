import React from "react";
import { useState, useRef, useEffect } from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Card from "../../components/Card";
import SlideNavButtons from "../../components/SlideNavButtons";

const PopularPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/plant.json")
      .then((res) => res.json())
      .then((data) => {
        const popular = data.filter((item) => item.hasOwnProperty("popular"));
        // console.log(popular);
        setPlants(popular);
      });
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative py-12">
        <h1 className={`marcellus text-6xl mb-4 text-center`}>
          Our Most Popular Plants
        </h1>
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
          modules={[Autoplay]}
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
          {plants.map((item, i) => (
            <SwiperSlide key={i} className={`mt-20 mb-8 pl-12`}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PopularPlants;
