/**
 * Route protection component for authenticated routes.
 * Redirects to /login if user is not authenticated.
 *
 * @author Brendon Serrano
 */
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Wraps children and only renders if user is authenticated.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, preserving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
