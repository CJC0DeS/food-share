import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";

const ImageCarousel = ({ images }) => {
  SwiperCore.use([Navigation]);
  return (
    <Swiper navigation>
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[550px]"
            style={{
              background: `url(${url}) center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
