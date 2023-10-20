"use client"; // This is a client component 👈🏽"
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { getCookie } from "cookies-next";
import withAuth from "@/lib/withAuth";

const Main = ({ children }) => {
  const isAuthenticated = !!getCookie('token');

  return (
    isAuthenticated ? (
      <>
        <Sidebar />
        <div className="main-content">
          <header className="site-header">
            <Header />
          </header>
          <div className={`main-content-wrap`}>
            {children}
          </div>
          <Footer />
        </div>
      </>
    ) : (
      <>
        {children}
      </>
    )
  );
};

export default withAuth(Main)
