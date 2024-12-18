import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Donors Say</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 snap-x snap-mandatory">
          {/* Testimonial 1 */}
          <div className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-lg snap-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
              alt="John Doe"
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-4">
              "This organization is doing amazing work in rural areas!"
            </p>
            <h4 className="font-bold text-gray-800">- John Doe</h4>
          </div>

          {/* Testimonial 2 */}
          <div className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-lg snap-center">
            <img
              src="https://source.unsplash.com/100x100/?woman,portrait"
              alt="Jane Smith"
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-4">
              "A real impact on people's lives through technology."
            </p>
            <h4 className="font-bold text-gray-800">- Jane Smith</h4>
          </div>

          {/* Testimonial 3 */}
          <div className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-lg snap-center">
            <img
              src="https://source.unsplash.com/100x100/?man,portrait"
              alt="Alex Johnson"
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-4">
              "Their efforts have truly transformed communities!"
            </p>
            <h4 className="font-bold text-gray-800">- Alex Johnson</h4>
          </div>

          {/* Testimonial 4 */}
          <div className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-lg snap-center">
            <img
              src="https://source.unsplash.com/100x100/?person,portrait"
              alt="Maria Lopez"
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-4">
              "Proud to support such a meaningful initiative."
            </p>
            <h4 className="font-bold text-gray-800">- Maria Lopez</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
