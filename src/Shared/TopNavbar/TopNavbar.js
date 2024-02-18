// import { useContext } from 'react';
import {
  FaFacebook,
  FaGripLinesVertical,
  FaInstagram,
  FaLocationArrow,
  FaPhoneAlt,
  FaSkype,
  FaTwitter,
  FaWhatsapp,
  FaRegEnvelope,
  FaMobileAlt,
} from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  // const {user} = useContext(AuthContext);
  return (
    <div className="bg-pDark w-full h-12 hidden md:inline-block print:hidden">
      <div className="max-w-[1600px]  mx-auto flex justify-between">
        {/* Contact section */}
        <div className="flex space-x-5 py-4">
          <div className="flex items-center justify-center">
            <div className="text-pred text-sm">
              <FaMobileAlt />
            </div>
            <p className="text-white px-1 text-xs">+8801760819195</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="text-pred text-sm">
              <FaRegEnvelope />
            </div>
            <p className="text-white text-xs"> shadinbd415@gmail.com</p>
          </div>
          <div className="flex items-center justify-center ">
            <div className="text-pred text-lg  px-1">
              {" "}
              <TbTruckDelivery />
            </div>
            <p className="text-white text-xs">Delivered All Over Bangladesh</p>
          </div>
        </div>

        {/* Signin/signup & social media section */}
        <div className="flex items-center justify-center space-x-4 ">
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

          {/* whatsApp */}

          <div className=" ">
            <Link to={"https://api.whatsapp.com/send?phone=8801760819195"}>
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
  );
};

export default TopNavbar;
