import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useBooked from "../Hooks/useBooked";
import useRole from "../Hooks/useRole";



const Dashboard = () => {

  const [booked] = useBooked()
  const [userData, userLoading] = useRole()


   if (userLoading || !userData) {
    return <p>Loading...</p>;
  }
  



  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">

          <div>

            {userData.role === "Student" && (
              <>
                <li>
                  <NavLink to="/dashboard/booked">
                    <FaBook></FaBook>
                    My booked session ({booked.length})</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/note">
                    <FaUtensils></FaUtensils>
                    Create note</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/personalNote">
                    <FaList></FaList>
                    Manage personal notes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/materials">
                    <FaBook></FaBook>
                    study materials</NavLink>
                </li>
              </>
            )}
            {userData.role === "Tutor" && (
              <>
                <li>
                  <NavLink to="/dashboard/createStudy">
                    <FaBook></FaBook>
                    Create Study</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/viewAllStudy">
                    <FaUtensils></FaUtensils>
                    View All Study</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/uploadMaterials">
                    <FaList></FaList>
                    Upload Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/ViewAllMaterials">
                    <FaBook></FaBook>
                    View All Materials</NavLink>
                </li>
              </>
            )}
            {userData.role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaBook></FaBook>
                    Users</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/studySession">
                    <FaUtensils></FaUtensils>
                    Study Session </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/adminMaterials">
                    <FaList></FaList>
                    Materials
                  </NavLink>
                </li>

              </>
            )}
          </div>


          {/* shared Nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch>
              Menu</NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact</NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;