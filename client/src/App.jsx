import "./App.css";
import Header from "./components/Header";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { useLoadProfileQuery } from "./store/api/authApi";
import { useState } from "react";
import Loader from "./components/Loader";
const App = () => {
  const { isLoading } = useLoadProfileQuery();

  const [pageLoading, setPageLoading] = useState(isLoading);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <Header />
          <Outlet />
        </div>
      )}

      <Toaster />
    </>
  );
};

export default App;
