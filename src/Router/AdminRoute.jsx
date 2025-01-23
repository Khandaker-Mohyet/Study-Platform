import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [userData, userLoading] = useRole()
    const location = useLocation();

    if (loading || userLoading) {
        return <p className="w-2/12 mx-auto">Loading...</p>;
    }

    if (user && userData.role === "admin") {
        return children;
    }

    return <Navigate state={location?.pathname} to={"/auth/login"}></Navigate>

};

export default AdminRoute;