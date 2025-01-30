import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./LatestProducts.css";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import LatestProductCard from "./LatestProductCard";
import { Button } from "flowbite-react";

export default function Banner() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://shadin-organic-server.vercel.app/latest-products-by-category"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const availableProducts = data.filter(
          (product) => product.product_status === "Available"
        );
        setProducts(availableProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="max-w-[1440px] mx-auto w-[98%]">
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        spaceBetween={2}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product} className="py-6">
            <LatestProductCard
              key={product?._id}
              product={product}
            ></LatestProductCard>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center w-full h-96">
            <Button className="bg-secondary hover:bg-secondary/80 hover:duration-200 text-white font-semibold">
              See All
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
