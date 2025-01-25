import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Auth from "../Layout/Auth";
import Login from "../Pages/login/Login";
import Register from "../Pages/Register/Register";
import Details from "../Pages/Details/Details";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Booked from "../Pages/Dashboard/Booked";
import Note from "../Pages/Dashboard/Note/Note";
import PersonalNote from "../Pages/Dashboard/PersonalNote/PersonalNote";
import Materials from "../Pages/Dashboard/Materials/Materials";
import Users from "../Pages/Dashboard/Admin/Users/Users";
import StudySession from "../Pages/Dashboard/Admin/StudySession/StudySession";
import AdminMaterials from "../Pages/Dashboard/Admin/AdminMaterials/AdminMaterials";
import CreateStudy from "../Pages/Dashboard/Tutor/CreateStudy/CreateStudy";
import ViewAllStudy from "../Pages/Dashboard/Tutor/ViewAllStudy/ViewAllStudy";
import UploadMaterials from "../Pages/Dashboard/Tutor/UploadMaterials/UploadMaterials";
import ViewAllMaterials from "../Pages/Dashboard/Tutor/ViewAllMaterials/ViewAllMaterials";
import BookedDetails from "../Pages/Dashboard/BookedDetails";
import UpdateMaterial from "../Pages/Dashboard/Tutor/ViewAllMaterials/UpdateMaterial";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/details/single/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/studySection/single/${params.id}`)
      },
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
    
    // Student section
    
      {
        path: 'booked',
        element: <Booked></Booked>,
      },
      {
        path: 'note',
        element:<Note></Note>
      },
      {
        path: 'personalNote',
        element:<PersonalNote></PersonalNote>,
        
      },
      {
        path: 'materials',
        element:<Materials></Materials>
      },
      {
        path: "details/:id",
        element: <BookedDetails></BookedDetails>,
        loader: ({params})=> fetch(`http://localhost:5000/studySection/single/${params.id}`)
      },


      // Admin Section
      {
        path: 'users',
        element:<AdminRoute><Users></Users></AdminRoute>
      },
      {
        path: 'studySession',
        element:<AdminRoute><StudySession></StudySession></AdminRoute>
      },
      {
        path: 'adminMaterials',
        element:<AdminRoute><AdminMaterials></AdminMaterials></AdminRoute>
      },

      // Toutor Section

      {
        path: 'createStudy',
        element:<CreateStudy></CreateStudy>
      },
      {
        path: 'viewAllStudy',
        element:<ViewAllStudy></ViewAllStudy>
      },
      {
        path: 'uploadMaterials',
        element:<UploadMaterials></UploadMaterials>
      },
      {
        path: 'ViewAllMaterials',
        element:<ViewAllMaterials></ViewAllMaterials>
      },
      {
        path: 'updateMaterials/:id',
        element: <UpdateMaterial></UpdateMaterial>,
        loader: ({params})=> fetch(`http://localhost:5000/materials/single/${params.id}`)
      },
    ]
  },
  {
    path: 'auth',
    element: <Auth></Auth>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      },
    ]
  }
]);

export default router;