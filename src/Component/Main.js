"use client"; // This is a client component 👈🏽"
import withAuth from "@/lib/withAuth";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Main = ({ children }) => {
  return <>
    <Sidebar />
    <div className="main-content">
      <header className="site-header">
        <Header />
      </header>
      <div className={`main-content-wrap`}>
        {children}
      </div>
      <Footer />
    </div></>
};

export default withAuth(Main);
