import React, { useContext } from "react";
import Banner from "../Banner/Banner";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import OurProduct from "../FlashSale/FlashSale";
import LatestProducts from "../LatestProducts/LatestProducts";
import ParallaxBanner from "../ParallaxBanner/ParallaxBanner";
import Discount from "../Discount/Discount";
import IconicProducts from "../IconicProducts/IconicProducts";
import CustomerReview from "../CustomerReview/CustomerReview";
import FixedImg from "../FixedImg/FixedImg";
import ShopLocation from "../ShopLocation/ShopLocation";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Helmet>
        <title>Shadin Organic</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedCategories></FeaturedCategories>
      <LatestProducts></LatestProducts>
      {/* <ParallaxBanner></ParallaxBanner> */}
      <OurProduct></OurProduct>
      <FixedImg></FixedImg>
      {/* <Discount></Discount> */}
      <IconicProducts></IconicProducts>
      {/* <CustomerReview></CustomerReview> */}
      {/* <ShopLocation></ShopLocation> */}
    </div>
  );
};

export default Home;
