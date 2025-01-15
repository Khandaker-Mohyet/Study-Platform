import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";


const Auth = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;