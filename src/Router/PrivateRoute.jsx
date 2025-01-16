import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext)
  console.log(user, loading)
  const location = useLocation()
  if (loading) {
    return <div className="flex"><span className="loading loading-infinity loading-lg justify-center items-center"></span></div>
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/auth/login"}></Navigate>
};

export default PrivateRoute;