import { FaBook, FaEnvelope, FaHome, FaList, FaRegUserCircle, FaSearch, FaStickyNote, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useBooked from "../Hooks/useBooked";
import useRole from "../Hooks/useRole";
import { MdCastForEducation } from "react-icons/md";
import { GiExplosiveMaterials } from "react-icons/gi";



const Dashboard = () => {

  const [booked] = useBooked()
  const [userData, userLoading] = useRole()


   if (userLoading || !userData) {
    return <p className="w-1/12 mx-auto mt-24">Loading...</p>;
  }
  

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen text-white bg-[#148f77]">
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
                    <FaStickyNote />
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
                    <GiExplosiveMaterials />
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
                    <FaRegUserCircle />
                    Users</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/studySession">
                    <MdCastForEducation />
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