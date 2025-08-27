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

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isLogin"));

  const navigate = useNavigate();

  const { data: profileData } = useLoadProfileQuery();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("isLogin"));
  }, [localStorage.getItem("isLogin")]);

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

  return (
    <div className=" head bg-gray-50 sticky top-0 shadow-lg shadow-neutral-400 z-50">
      <div className="  flex items-center justify-between h-16 px-5  mx-auto max-w-7xl relative">
        <Link to="/">
          <AlgoNestLogo />
        </Link>
        <div className="flex items-center gap-5 h-full ">
          <div>
            {loggedIn ? (
              <div className="flex gap-2 items-center w-fit overflow-hidden  bg-white  cursor-pointer group">
                <div
                  className=" h-10 w-10 bg-white shadow-sm  inline-block  hover:shadow-purple-400/50  rounded-full overflow-hidden"
                  onClickCapture={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => setDarkMode((prev) => !prev)}
                  title="profile"
                >
                  {profileData?.data?.profilePic ? (
                    <img
                      src={profileData?.data?.profilePic}
                      alt="profile-pic"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser size={20} className="my-2 mx-3" />
                  )}
                </div>
                <p className="text-semibold">Profile</p>
                <div className="absolute top-16 -translate-y-[200%] group-hover:translate-y-[0] bg-gray-50/80 flex flex-col gap-1 px-4 py-2 rounded-b-lg overflow-hidden transition-transform duration-700">
                  <div className="flex flex-col gap-3">
                    <h1 className="font-semibold">Profile</h1>
                    <hr />
                    <div className="flex flex-col gap-1">
                      <Link
                        to={`profile`}
                        className="hover:scale-95 transition-all duration-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to={"my-learning"}
                        className="hover:scale-95 transition-all duration-50"
                      >
                        My Learning
                      </Link>

                      <p
                        onClick={handleLogout}
                        className="hover:scale-95 transition-all duration-50 flex items-center gap-2"
                      >
                        Logout{" "}
                        <span>
                          <LuLogOut size={12} />
                        </span>
                      </p>
                      {profileData?.data?.userRole === "instructor" && (
                        <Link
                          to={"admin"}
                          className="hover:scale-95 transition-all duration-50"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <NavLink to={"/auth"} state={{ login: true }}>
                  <Button
                    className={
                      "!px-2 !py-1 text-gray-800  hover:bg-purple-500/80 hover:text-slate-50 transition-all duration-200"
                    }
                  >
                    Sign in
                  </Button>
                </NavLink>
                <NavLink to={"/auth"} state={{ login: false }}>
                  <Button
                    className={
                      "!px-2 !py-1 text-gray-800 hover:bg-purple-500/80 hover:text-slate-50 transition-all duration-200"
                    }
                  >
                    Sign up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <div
            className="p-2 shadow-lg  hover:shadow-purple-400/50  rounded-full cursor-pointer"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? (
              <FaSun size={20} className=" " />
            ) : (
              <FaMoon size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
