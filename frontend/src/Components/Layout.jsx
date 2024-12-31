import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <> <div className="fixed w-full top-0 left-0 z-10 bg-white shadow-md">
    <Header />
  </div>
    
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
