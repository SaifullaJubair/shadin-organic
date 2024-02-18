import React, { useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsArrowLeftShort,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleTitleSection from "./FlashTitle";
import FlashCard from "./FlashCard/FlashCard";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
const OurProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const availableProducts = data?.filter(
          (product) => product?.product_status === "Available"
        );
        setProducts(availableProducts?.slice(0, 8));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // console.log(products);
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className=" mx-auto my-16">
        <div className="flex md:flex-col lg:flex-col xl:flex-col 2xl-flex-row flex-col md:mx-7 mx-6">
          <div>
            {/* flash sate title  */}
            <div className="">
              {/* <FlashSaleTitleSection></FlashSaleTitleSection> */}
              <h1 className="text-2xl font-semibold text-gray-700">
                Our Products:
              </h1>
              {/* <div className="flex items-center justify-center ">
              <BsArrowLeftShort className="mr-2 text-2xl"></BsArrowLeftShort>
              <BsArrowRightCircleFill className="mr-4 text-xl"></BsArrowRightCircleFill>
            </div> */}
            </div>
            {/* flash sale card section  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-6 gap-4 ">
              {products.map((product) => (
                <FlashCard key={product?._id} product={product}></FlashCard>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Link to="/category/all">
            <Button className="mt-6 mx-auto w-44" color="light">
              {" "}
              View All{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
