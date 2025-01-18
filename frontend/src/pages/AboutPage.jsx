import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col h-[800px] bg-gray-50 relative top-[50px]">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-green-600 font-semibold text-sm">Our Mission</h2>
            <h1 className="text-4xl font-bold mt-2">
              Together, We Can <span className="block">End Hunger</span>
            </h1>
            <p className="text-gray-600 mt-6 leading-relaxed">
              Founded with the vision of a hunger-free world, our organization strives to make nutritious meals accessible
              to everyone. With the help of our dedicated team and volunteers, we collect surplus food, partner with local
              food banks, and provide meals to families in need. Together, we are creating a world where no one goes to bed
              hungry, and communities are empowered to thrive.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-rows-2 gap-4">
            <div className="bg-green-100 rounded-lg overflow-hidden flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Food Donation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800">10+</h3>
                <p className="text-sm text-gray-500 mt-1">Years of Service</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800">1M+</h3>
                <p className="text-sm text-gray-500 mt-1">Meals Delivered</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800">500+</h3>
                <p className="text-sm text-gray-500 mt-1">Volunteers</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800">200+</h3>
                <p className="text-sm text-gray-500 mt-1">Communities Helped</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
