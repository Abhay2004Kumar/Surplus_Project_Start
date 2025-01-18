import React from "react";

const About = () => {
  return (
    <section id="about-us" className="py-[150px] px-6 md:px-12 bg-white ">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Text Section */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {/* <span className="font-semibold">Share and connect</span> */}
            <br />
            Transforming surplus into sustenance, Changee is a revolutionary platform dedicated to connecting individuals with surplus food to those in need, promoting a sustainable and community-focused approach to reducing food waste.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
           We empower users to register and list their extra food items, enabling others to conveniently pick them up at specified locations. Join us in fostering a culture of sharing while making a positive impact on the environment and the community.
          </p>
         
    
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us"
            className="rounded-lg shadow-lg object-cover w-[80%] h-auto md:w-full md:h-[300px]"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
