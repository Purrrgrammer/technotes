import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";

const DashLayout = () => {
  return (
    <div className="flex flex-col justify-between h-[100vh] bg-slate-200 p-10">
      <DashHeader />
      <div className="">
        <b>Content</b>
        <Outlet />
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;
