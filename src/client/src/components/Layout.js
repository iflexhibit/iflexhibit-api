import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";

const Layout = ({ layoutContent }) => {
  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">{layoutContent}</div>
      </main>
    </>
  );
};

export default Layout;
