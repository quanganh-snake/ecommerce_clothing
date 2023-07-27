import React, { memo } from "react";
import { Navigate } from "react-router-dom";

import { Alert } from "../alert";

const CheckRoute = ({ children }) => {
  // if no has token in localStoreage when access to private route
  if (
    !localStorage.getItem("persist:root") ||
    !JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      .currentUser?.isAdmin
  ) {
    localStorage.removeItem("persist:root");
    Alert({ name: "Đăng nhập lại.", icon: "warning" });
    return <Navigate to="/login" />;
  }
  return children;
};

function ProtectRoute(props) {
  return <CheckRoute>{props.children}</CheckRoute>;
}

export default memo(ProtectRoute);
