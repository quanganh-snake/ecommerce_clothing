import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/">
            <span className="logo">Hair Admin</span>
          </Link>
        </div>
        <div className="topRight"></div>
      </div>
    </div>
  );
}
