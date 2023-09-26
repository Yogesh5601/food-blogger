import React from "react";
import Blog from "./components/blog/Blog";
import Category from "./components/category/Category";
import RootLayout from "./RootLayout";

const Dashbord = () => {
  return (
    <>
      <Category />
      <Blog />
    </>
  );
};

export default Dashbord;
