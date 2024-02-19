// import { Pagination } from "swiper/modules";
// import { Card } from "flowbite-react";
// import React, { useEffect, useState } from "react";
// import LatestProductCard from "./LatestProductCard";
// import FlashCard from "../FlashSale/FlashCard/FlashCard";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "./LatestProducts.css";
// const LatestProducts = () => {
// const [products, setProducts] = useState([]);

// useEffect(() => {
//   fetch(
//     "https://shadin-organic-server.vercel.app/latest-products-by-category"
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log(data);
//       const availableProducts = data.filter(
//         (product) => product.product_status === "Available"
//       );
//       setProducts(availableProducts);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);

//   // console.log("Tranding products", products);
//   return (
//     <div className="max-w-[1440px] mx-auto">
//       <div>
//         {products.length !== 0 && (
//           <div className="my-12 w-full ">
//             <div>
//               <h1 className="text-2xl mx-3 mt-16 mb-6 text-gray-700 font-semibold">
//                 Latest Product
//               </h1>
//             </div>
//             <div className="">
//               <Swiper
//                 slidesPerView={3}
//                 spaceBetween={30}
//                 pagination={{
//                   clickable: true,
//                 }}
//                 modules={[Pagination]}
//                 className="mySwiper grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 "
//               >
//                 {products.map((product) => (
//                   <LatestProductCard key={product?._id} product={product}>
//                     <SwiperSlide></SwiperSlide>
//                   </LatestProductCard>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LatestProducts;

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./LatestProducts.css";

// import required modules
import { Pagination } from "swiper/modules";
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
        modules={[Pagination]}
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
