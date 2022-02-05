import PendingPostsLayout from "./layouts/PendingPostsLayout";
import ReportEntriesLayout from "./layouts/ReportEntriesLayout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";
import GeneralOverviewLayout from "./layouts/GeneralOverviewLayout";
import BannedEntriesLayout from "./layouts/BannedEntriesLayout";
import { Route, Routes } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<GeneralOverviewLayout />} />
            <Route path="/pending" element={<PendingPostsLayout />} />
            <Route path="/reports" element={<ReportEntriesLayout />} />
            <Route path="/bans" element={<BannedEntriesLayout />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default Layout;
