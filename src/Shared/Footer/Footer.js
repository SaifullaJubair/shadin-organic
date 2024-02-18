import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import logo from "../../assets/Logo/logo.png";
import { useState } from "react";
import { useEffect } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/allcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className=" print:hidden bg-pDark">
      <div className="max-w-[1440px] mx-auto">
        <footer className="py-10  text-white">
          <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
            <div className="grid grid-cols-12">
              <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                <Link to="/" className="flex pace-x-3 md:justify-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-light">
                    <img src={logo} alt="" className="rounded-full" />
                  </div>
                  <span className="self-center ml-3 text-2xl font-semibold">
                    Shadin Organic
                  </span>
                </Link>
                <p className="my-3 mx-2 max-w-sm font-semibold text-sm text-gray-200">
                  Bringing nature's best to your daily routine! At Shadin
                  Organic, we believe in using only the finest organic
                  ingredients to enhance your health and beauty. From skincare
                  to wellness, we have everything you need to feel confident and
                  beautiful inside and out. Join us in our mission to live a
                  more organic lifestyle. self-care and self-love.
                </p>
              </div>
              <div className="col-span-12  md:text-left md:col-span-3">
                <p className="pb-1 text-lg font-medium">Category</p>
                <ul>
                  {categories.map((category) => (
                    <li key={category?._id} className="my-1.5">
                      {" "}
                      <Link
                        className="p-2 m-2 text-white font-semibold border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
                        to={`/category/${category?.name}`}
                      >
                        {category?.name}{" "}
                      </Link>
                    </li>
                  ))}
                  <li className="my-1.5">
                    <Link
                      className="p-2 m-2 text-white font-semibold border-b-2 border-transparent hover:border-red-700 hover:text-red-700 duration-500"
                      to="/category/all"
                    >
                      All ...
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-12  md:text-left md:col-span-3">
                <p className="pb-1 text-lg font-medium">Contact Us</p>
                <ul className="dark:text-gray-400">
                  <li>
                    <p className="flex items-center gap-2 mb-2">
                      <FaMobileAlt className="text-pred" />
                      +8801760819195 <br />
                      +8801918278592
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center gap-2 mb-2">
                      <TfiEmail className="text-pred" />
                      shadinbd415@gmail.com
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center gap-2 mb-2">
                      <TbTruckDelivery className="text-pred text-lg" />
                      Delivered All Over Bangladesh.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid justify-center pt-6 lg:justify-between">
              <div className="flex flex-col  text-sm md:block lg:col-start-1 md:space-x-6">
                <span>©2024 All rights reserved</span>
                <a rel="noopener noreferrer" href="#">
                  <span>Privacy policy</span>
                </a>
                <a rel="noopener noreferrer" href="#">
                  <span>Terms of service</span>
                </a>
              </div>
              <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                <div className="text-blue-600 font-semibold  ">
                  <Link to="https://www.facebook.com/shadinorganicbd/">
                    <img
                      src="https://i.ibb.co/3svdqMq/icons8-facebook-48.png"
                      className="w-6 h-6"
                      alt=""
                    />
                  </Link>
                </div>
                <div className=" ">
                  <Link to={"https://www.instagram.com"}>
                    <img
                      src="https://i.ibb.co/5nGDypW/icons8-instagram-48.png"
                      className="w-6 h-6"
                      alt=""
                    />
                  </Link>
                </div>

                <div className=" ">
                  <Link
                    to={"https://api.whatsapp.com/send?phone=8801760819195"}
                  >
                    <img
                      src="https://i.ibb.co/n36N75q/icons8-whatsapp-messenger-is-a-freeware-cross-platform-messaging-and-voice-over-ip-service-48.png"
                      alt=""
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
