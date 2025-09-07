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
import useDarkMode from "./hooks/useDarkMode";
const App = () => {
  const { isLoading, data: profileData } = useLoadProfileQuery();

  const [pageLoading, setPageLoading] = useState(false);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div >
          <Header
            profileData={profileData}
            isDarkMode={isDarkMode}
            toggleDarkMode={() => {
              console.log(isDarkMode);
              toggleDarkMode();
            }}
          />
          <Outlet />
          <Footer />
        </div>
      )}

      <Toaster />
    </>
  );
};

export default App;
