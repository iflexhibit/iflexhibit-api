import PendingPostsLayout from "./layouts/PendingPostsLayout";
import ReportEntriesLayout from "./layouts/ReportEntriesLayout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">
          {/* <PendingPostsLayout/> */}
          <ReportEntriesLayout />
        </div>
      </main>
    </>
  );
};

export default Layout;
