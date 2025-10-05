import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("accessToken")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
