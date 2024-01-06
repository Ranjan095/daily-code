/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import User from "../User/User";

const AllRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
};

export default AllRoute;
