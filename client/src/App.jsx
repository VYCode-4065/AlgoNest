import "./App.css";
import Header from "./components/Header";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { useLoadProfileQuery } from "./store/api/authApi";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
const App = () => {
  
  const { isLoading, data: profileData } = useLoadProfileQuery();

  const [pageLoading, setPageLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <Header profileData={profileData} />
          <Outlet />
          <Footer />
        </div>
      )}

      <Toaster />
    </>
  );
};

export default App;
