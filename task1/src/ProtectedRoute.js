import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate(); // Hook to programmatically navigate

  // If there is no token, this will prevent rendering children
  useEffect(() => {
    if (!token) {
      // If there's no token, navigate to the login page
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return children; // Allow access to protected content if token exists
};

export default ProtectedRoute;
