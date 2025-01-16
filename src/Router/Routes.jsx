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
        path: "/details/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/studySection/${params.id}`)
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
        element:<Booked></Booked>
      },
      {
        path: 'note',
        element:<Note></Note>
      },
      {
        path: 'personalNote',
        element:<PersonalNote></PersonalNote>
      },
      {
        path: 'materials',
        element:<Materials></Materials>
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