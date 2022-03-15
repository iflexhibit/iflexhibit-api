import Layout from "./components/Layout";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GeneralOverviewLayout from "./components/layouts/GeneralOverviewLayout";
import BannedEntriesLayout from "./components/layouts/BannedEntriesLayout";
import PendingPostsLayout from "./components/layouts/PendingPostsLayout";
import ReportEntriesLayout from "./components/layouts/ReportEntriesLayout";
import UserPermissionsLayout from "./components/layouts/UserPermissionsLayout";
import SystemReportLayout from "./components/layouts/SystemReportLayout";
import UserViolationsLayout from "./components/layouts/UserViolationsLayout";
import SystemConfigurationsLayout from "./components/layouts/SystemConfigurationsLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Layout layoutContent={<GeneralOverviewLayout />} />}
        />
        <Route
          path="/pending"
          element={<Layout layoutContent={<PendingPostsLayout />} />}
        />
        <Route
          path="/reports"
          element={<Layout layoutContent={<ReportEntriesLayout />} />}
        />
        <Route
          path="/bans"
          element={<Layout layoutContent={<BannedEntriesLayout />} />}
        />
        <Route
          path="/violations"
          element={<Layout layoutContent={<UserViolationsLayout />} />}
        />
        <Route
          path="/permissions"
          element={<Layout layoutContent={<UserPermissionsLayout />} />}
        />
        <Route
          path="/configs"
          element={<Layout layoutContent={<SystemConfigurationsLayout />} />}
        />
        <Route
          path="/system"
          element={<Layout layoutContent={<SystemReportLayout />} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
