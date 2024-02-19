import React from "react";
// import "./FixedImg.css";
import second from "../../../assets/product-img/320595792_562811291862410_1281320868492379089_n.jpg";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../Shared/Loader/Loader";

const FixedImg = () => {
  const [fixedImage, setFixedImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/allFixedImg")
      .then((res) => res.json())
      .then((data) => {
        // Find the latest active fixed image
        const sortedData = data
          .filter((item) => item.status === "Active")
          .sort((a, b) => {
            const dateA = new Date(a.post_date);
            const dateB = new Date(b.post_date);
            return dateB - dateA;
          });

        if (sortedData.length > 0) {
          const latestFixedImg = sortedData;
          // console.log("Latest Active FixedImg URL:", latestFixedImg);
          setFixedImg(latestFixedImg);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);
  if (isLoading) {
    <Loader />;
  }
  // console.log(fixedImage);
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to top, #000000, 70%, transparent),url(${fixedImage[0]?.fixedImg})`,
    backgroundSize: "100% 90%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "50vh",
  };
  // console.log(fixedImage.length);
  return (
    <div className="hidden md:block lg:block">
      {fixedImage?.length > 0 ? (
        <div className="my-16 " style={backgroundImageStyle}></div>
      ) : (
        <div
          className="min-h-[50vh]  bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `linear-gradient(to top, #000000, 70%, transparent),url(${second})`,

            backgroundSize: "100% 90%",
            backgroundPosition: "center",
          }}
        >
          <div></div>
        </div>
      )}
    </div>
  );
};

export default FixedImg;
