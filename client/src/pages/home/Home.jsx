import React from "react";
import Banner from "../../components/Banner";
import Category from "./Categories";
import OutServices from "./OutServices";
import SpecialProducts from "./SpecialProducts";
import Testimonials from "./Testimonials";
const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <SpecialProducts />
      <Testimonials />
      <OutServices />
    </div>
  );
};

export default Home;