import Layout from "./components/Layout";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GeneralOverviewLayout from "./components/layouts/GeneralOverviewLayout";
import BannedEntriesLayout from "./components/layouts/BannedEntriesLayout";
import PendingPostsLayout from "./components/layouts/PendingPostsLayout";
import ReportEntriesLayout from "./components/layouts/ReportEntriesLayout";
import UserPermissionsLayout from "./components/layouts/UserPermissionsLayout";

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
          path="/permissions"
          element={<Layout layoutContent={<UserPermissionsLayout />} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
