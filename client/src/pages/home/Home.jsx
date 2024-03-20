import React from "react";
import Banner from "../../Components/Banner";
import Categories from "./Categories";
import OurServices from "./OurServices";
import SpecialProduct from "./SpecialProduct";
import Testimonials from "./Testimonials";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialProduct />
      <Testimonials />
      <OurServices />
    </div>
  );
};

export default Home;
