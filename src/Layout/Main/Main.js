import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../../Shared/TopNavbar/TopNavbar";
import SecondNavbar from "../../Shared/SecondNavbar/SecondNavbar";
import Footer from "../../Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <TopNavbar></TopNavbar>
      <SecondNavbar></SecondNavbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer> </Footer>
    </div>
  );
};

export default Main;
