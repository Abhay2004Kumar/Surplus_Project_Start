import React from "react";
import About from "../Components/About";
import Testimonials from "../Components/Testimonials";
import Bheader from "../Components/Bheader";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Bheader/>
      <About />
      {/* <Testimonials /> */}
    </div>
  );
};

export default HomePage;
