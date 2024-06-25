import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

/**
 * A component that protects routes and redirects unauthenticated users to the login page.
 *
 * @returns {JSX.Element}
 */
const PrivateRoutes = () => {
  const { username } = useContext(UserContext);

  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
