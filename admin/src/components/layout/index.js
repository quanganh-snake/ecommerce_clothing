import React from "react";
import ProtectRoute from "../protectRoute";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function Layout(props) {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {props.children}
      </div>
    </>
  );
}

export function LayoutProtect(props) {
  return (
    <ProtectRoute>
      <Topbar />
      <div className="container">
        <Sidebar />
        {props.children}
      </div>
    </ProtectRoute>
  );
}
