import React, { useState, useEffect } from "react";
import FlashCarousel from "../FlashSale/FlashCarousel";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "flowbite-react";
const LatestProductCard = ({ product }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [reviews, setReviews] = useState([]);

  const {
    _id,
    product_uid,
    product_name,
    category,
    box_content,

    primary_img,
    price,
    product_status,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
  } = product;

  useEffect(() => {
    fetch(`https://shadin-organic-server.vercel.app/all-review/${product?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        // Handle fetch error if necessary
        console.error(error);
      });
  }, [product]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  const renderStars = (averageRating) => {
    const starArray = []; //This line initializes an empty array called starArray where we will store the JSX elements representing the stars.
    const numberOfFullStars = Math.floor(averageRating);
    //This line calculates the number of full stars based on the averageRating. Math.floor() is used to round down the averageRating to the nearest whole number, giving us the count of full stars.
    const fractionalPart = averageRating - numberOfFullStars;
    //This line calculates the fractional part of the averageRating by subtracting the number of full stars from the averageRating. This fractional part represents how much of the last star should be filled.
    const starWidth = `${(fractionalPart * 100).toFixed(0)}%`;

    // This line calculates the width of the fractional star as a percentage. It multiplies the fractionalPart by 100 to get a percentage and uses toFixed(0) to round the percentage to the nearest whole number.

    // Add full stars
    for (let i = 0; i < numberOfFullStars; i++) {
      starArray.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    //This loop iterates numberOfFullStars times and adds FaStar elements with a yellow color to starArray. Each star has a unique key based on its index.
    // Add fractional star
    if (fractionalPart > 0) {
      starArray.push(
        <div key="fractional" className="relative">
          <div style={{ maxWidth: "100%" }}>
            <FaStar
              className="text-yellow-400"
              style={{ width: starWidth, overflow: "hidden", zIndex: 1 }}
            />
          </div>
          <FaRegStar className="text-yellow-400 absolute top-0 left-0" />
        </div>
      );
    }
    //If there's a fractional part greater than 0, this block adds a fractional star. It creates a div element with a maximum width of 100% and places an overflowing FaStar inside it. The FaRegStar is added as an empty star to cover the overflow and create the effect of a partially filled star.

    // Add empty stars
    const emptyStars = 5 - numberOfFullStars - (fractionalPart > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
      );
    }
    //This loop adds the remaining empty stars to starArray. The total number of stars is 5, so we subtract the number of full stars and the fractional part (if present) to calculate the number of empty stars. Empty stars are represented by FaRegStar components.
    return starArray;
  };

  const averageRating = calculateAverageRating(reviews);
  return (
    <div
      className="w-full my-4 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto
      "
      // className="w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <div>
          <FlashCarousel product={product}></FlashCarousel>
        </div>
      ) : (
        <div className=" h-60  ">
          <img
            className="rounded-t-lg w-full h-full "
            src={primary_img}
            alt=""
          />
        </div>
      )}

      <div className="px-5 my-2 pb-2">
        <Link to={`/singleproduct/${_id}`}>
          <h5 className=" text-sm md:text-base font-semibold text-left tracking-tighter text-gray-900 dark:text-white">
            {product_name.length > 20
              ? product_name.slice(0, 20) + "..."
              : product_name}
          </h5>
          <h5 className="text-xs  md:text-sm  pt-2 text-left font-semibold tracking-tight text-gray-500 dark:text-white">
            {category}
          </h5>

          <div className="flex flex-wrap items-center text-sm  mt-2 mb-1 space-x-2">
            <div className="flex items-center">
              {renderStars(averageRating)}
            </div>
            <span className="text-gray-600">{averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="lg:text-2xl md:text-xl  text-xl font-bold text-gray-900 dark:text-white">
              {price}
              <span className="font-bold">৳</span>
            </span>
            <div className="mt-2">
              <Link to={`/singleproduct/${_id}`}>
                <Button
                  size="xs"
                  className="bg-secondary  hover:bg-secondary/80 hover:duration-200 text-white font-semibold"
                >
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LatestProductCard;
