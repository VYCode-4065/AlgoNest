import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import Profile from "../pages/Profile";
import MyLearning from "../pages/MyLearning";
import Sidebar from "../admin/Sidebar";
import Dashboard from "../admin/Dashboard";
import AdminPage from "../admin/AdminPage";
import CourseTable from "../admin/CourseTable";
import CourseDetails from "../pages/CourseDetails";
import CourseCollection from "../pages/CourseCollection";
import CreatePayment from "../pages/CreatePayment";
import Lectures from "../admin/letcures/Lectures";
import AddLecture from "../admin/letcures/AddLecture";
import PlayCourse from "../pages/PlayCourse";
import GoogleAuth from "../pages/GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Authentication />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "my-learning/course/:courseTitle",
        element: <PlayCourse />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CourseTable />,
          },
        ],
      },
      {
        path: "/course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "/courses",
        element: <CourseCollection />,
      },
      {
        path: "/checkout",
        element: <CreatePayment />,
      },
    ],
  },
]);

export default router;
