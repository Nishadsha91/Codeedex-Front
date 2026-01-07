import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
