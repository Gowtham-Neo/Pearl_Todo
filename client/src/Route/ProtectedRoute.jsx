import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();

  const authenticated = !!localStorage.getItem("auth_token");
  if (authenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace state={{ referrer: pathname }} />;
};

export default ProtectedRoute;
