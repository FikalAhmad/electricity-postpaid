import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAppContext = () => {
  return useContext(AuthContext);
};

export default useAppContext;
