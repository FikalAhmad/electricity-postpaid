import { Navigate } from "react-router-dom";
import useAppContext from "./useAppContext";

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAppContext();

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
