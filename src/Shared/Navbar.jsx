import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import logo from "../assets/e-logo.png"


const Navbar = () => {

  const { user, singInOut } = useAuth()
  const [userData, userLoading] = useRole()


  

  const navOption = <>
    <NavLink className={({ isActive }) => `text-lg font-bold mr-3 ${isActive ? 'text-[#008080]' : 'hover:text-purple-600'}`} to='/'>Home</NavLink>
    
      <NavLink className={({ isActive }) => ` text-lg font-bold ${isActive ? 'text-purple-600' : 'hover:text-purple-600'}`} to={
        userData?.role === "Student"
          ? "/dashboard/booked"
          : userData?.role === "Tutor"
            ? "/dashboard/createStudy"
            : userData?.role === "admin"
              ? "/dashboard/users"
              : "/auth/login"
      }>
        Dashboard
      </NavLink>
    

  </>


  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navOption}
          </ul>
        </div>
        <img className="w-20 h-20" src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOption}
        </ul>
      </div>

      <div className="navbar-end">
        {user && user.email ? (
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-[2px] rounded-full mr-3">
            <img
              title={`${user.displayName}`}
              className="w-12 h-12 rounded-full bg-white object-cover"
              src={user.photoURL}
              alt="User"
            />
          </div>
        ) : ""}
        {
          user && user?.email ? <button onClick={singInOut} className="bg-gradient-to-r from-[#008080] to-[#a569bd] text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transform hover:scale-105 transition-all">Log out</button> : <Link to="/auth/Login" className="bg-gradient-to-r from-[#008080] to-[#a569bd] text-white font-semibold py-2 px-4 rounded shadow hover:shadow-lg transform hover:scale-105 transition-all">Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;