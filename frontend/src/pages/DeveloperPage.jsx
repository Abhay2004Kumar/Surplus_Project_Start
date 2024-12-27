import React from "react";

const contributors = [
  {
    name: "Aryan Verma",
    description:
      "Passionate developer skilled in React, Tailwind CSS, and backend development. Building innovative and user-friendly web applications.",
    github: "https://github.com/Aryanverma28",
    photo: "https://avatars.githubusercontent.com/u/146024110?v=4",
  },
  {
    name: "Abhay Kumar",
    description:
      "Enthusiastic developer with expertise in Node.js, MongoDB, and Express. Focused on crafting scalable and efficient backend solutions.",
    github: "https://github.com/Abhay2004Kumar",
    photo: "https://avatars.githubusercontent.com/u/119209682?s=400&u=7b7ff1bcb43aeddc9d6e9193db195f733e6b1c65&v=4",
  },
];

const DeveloperPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 flex items-center justify-center p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl w-[28rem] h-[28rem] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 opacity-20 hover:opacity-40 transition duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-44 h-44 rounded-full shadow-xl overflow-hidden mb-6">
                <img
                  src={contributor.photo}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 group-hover:text-blue-600 transition duration-300">
                {contributor.name}
              </h1>
              <p className="text-gray-600 text-lg mt-4 text-center px-6 group-hover:text-gray-800 transition duration-300">
                {contributor.description}
              </p>
              <a
                href={contributor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-8 py-4 bg-blue-500 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperPage;
