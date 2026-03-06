import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
