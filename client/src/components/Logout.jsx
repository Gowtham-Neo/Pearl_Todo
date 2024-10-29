import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }, []);
  console.log("successfull")
  return <Navigate to="/" />;
};

export default Logout;
