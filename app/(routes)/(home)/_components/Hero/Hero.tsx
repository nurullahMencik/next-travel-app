"use client";
import { Button } from "@/components/ui/button";
import { slides } from "@/constans";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import MainSearch from "./MainSearch";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className="relative bg-orange-200 py-16">
      <div className="container mx-auto px-4 flex flex-col items-center lg:flex-row ">
        {/**Left */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left px-6 transition-all duration-500">
          <h4 className="text-orange-600 font-bold text-lg">Lets Go Now</h4>
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
            {slides[currentSlide].title}
          </h1>
          <p className="text-gray-600 text-base md:text-xl">
            {slides[currentSlide].description}
          </p>
          <Button className="bg-orange-500 hover:bg-orange-500">
            {slides[currentSlide].buttonText}
          </Button>
        </div>

        {/**Right */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 w-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}

            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full"
            onSlideChange={(swiper)=>setCurrentSlide(swiper.realIndex)}
          >
            {slides.map((value, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-3xl overflow-hidden">
                  <Image
                    src={value.image}
                    height={500}
                    width={600}
                    alt={value.title}
                    className="w-full h-100 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <MainSearch/>
      </div>
    </div>
  );
};

export default Hero;
