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
        path: "admin",
        element: <AdminPage />,
        children: [
          {
            index:true,
            path: "admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "admin/courses",
            element: <CourseTable />,
          },
        ],
      },
    ],
  },
]);

export default router;
