import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";

const DashLayout = () => {
  return (
    <div>
      <DashHeader />
      <div>
        <Outlet />
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;
