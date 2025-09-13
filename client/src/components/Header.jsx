import React, { useEffect, useState } from "react";
import { MdSchool } from "react-icons/md";
import Button from "./Button";
import AlgoNestLogo from "./Logo";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useSelector } from "react-redux";
import {
  useLoadProfileQuery,
  useLoggoutUserMutation,
} from "../store/api/authApi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfileData } from "../features/authSlice";
import useDarkMode from "../hooks/useDarkMode";
import Switch from "./ModeToggle";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const authData = useSelector(getProfileData);
  const profileData = authData.user;

  const [openNavOption, setOpenNavOption] = useState(false);

  const [darkMode, setDarkMode] = useState(isDarkMode);
  const [loggedIn, setLoggedIn] = useState(authData.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(authData.isAuthenticated);
  }, [authData.isAuthenticated]);

  const [logoutUser, { isError, isLoading, isSuccess, error }] =
    useLoggoutUserMutation();
  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response.data.success) {
        localStorage.removeItem("isLogin");
        navigate("/");
        return toast.success("User logged out successfully !");
      }

      if (response.error.data.error) {
        throw "Unable to logout user !";
      }
    } catch (error) {
      // toast.error(error);
      console.log(error);
    }
  };

  document.addEventListener('click',()=>{
    setOpenNavOption(false)
  })

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        // setOpenNavOption(false);
      }}
      className="header bg-gray-50  sticky top-0 shadow-sm shadow-slate-200 z-50  dark:text-slate-200 dark:bg-slate-800"
    >
      <div className="  flex items-center justify-between h-16 px-5  mx-auto max-w-7xl relative">
        <Link to="/">
          <AlgoNestLogo />
        </Link>
        <div className="flex items-center gap-5 h-full ">
          <div>
            {loggedIn ? (
              <div
                onClick={(e) => {
                  setOpenNavOption((prev) => !prev);
                }}
                className=" flex gap-2 items-center w-fit overflow-hidden   cursor-pointer transition-all duration-500"
              >
                <div
                  className=" h-10 w-10 bg-white shadow-sm  inline-block  hover:shadow-purple-400/50  rounded-full overflow-hidden"
                  title="profile"
                >
                  {profileData?.profilePic ? (
                    <img
                      src={profileData?.profilePic}
                      alt="profile-pic"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser size={20} className="my-2 mx-3" />
                  )}
                </div>
                <p className="text-semibold">Profile</p>
                <div
                  className={`fixed w-40 top-16 ${
                    openNavOption
                      ? "translate-y-0 scale-100"
                      : "-translate-y-100 scale-0"
                  } transition duration-200`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenNavOption(false);
                  }}
                >
                  <div
                    className={`bg-slate-200 backdrop-blur-sm dark:bg-slate-800 py-2 rounded-b-lg overflow-hidden  w-full`}
                  >
                    <div className="flex flex-col gap-3">
                      <h1 className="font-semibold px-5">Profile</h1>
                      <hr />
                      <div className="flex flex-col ">
                        <Link
                          to={`profile`}
                          className="hover:scale-95 transition-all duration-100 hover:bg-purple-700 hover:text-slate-100 px-5 py-1 "
                        >
                          My Profile
                        </Link>
                        <Link
                          to={"my-learning"}
                          className="hover:scale-95 transition-all duration-50 hover:bg-purple-700 hover:text-slate-100 px-5 py-1"
                        >
                          My Learning
                        </Link>

                        <p
                          onClick={handleLogout}
                          className="hover:scale-95 transition-all duration-50 flex items-center gap-2 hover:bg-purple-700  hover:text-slate-100 px-5 py-1"
                        >
                          Logout{" "}
                          <span>
                            <LuLogOut size={12} />
                          </span>
                        </p>
                        {profileData?.userRole === "instructor" && (
                          <Link
                            to={"admin"}
                            className="hover:scale-95 transition-all duration-50 hover:bg-purple-700  hover:text-slate-100 px-5 py-1"
                          >
                            Dashboard
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <NavLink to={"/auth"} state={{ login: true }}>
                  <Button
                    className={
                      "!px-2 !py-1 text-gray-800 dark:text-slate-300 hover:bg-purple-500/80 hover:text-slate-50 transition-all duration-200"
                    }
                  >
                    Sign in
                  </Button>
                </NavLink>
                <NavLink to={"/auth"} state={{ login: false }}>
                  <Button
                    className={
                      "!px-2 !py-1 text-gray-800 dark:text-slate-300 hover:bg-purple-500/80 hover:text-slate-50 transition-all duration-200"
                    }
                  >
                    Sign up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <div className=" shadow-lg  hover:shadow-purple-400/50  rounded-full cursor-pointer">
            <Switch toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
