import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import Profile from "../pages/Profile";
import MyLearning from "../pages/MyLearning";

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
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
    ],
  },
]);

export default router;
