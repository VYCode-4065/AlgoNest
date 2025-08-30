import React, { useEffect, useState } from "react";
import {
  useLoadProfileQuery,
  useLoggoutUserMutation,
} from "../store/api/authApi";
import { FaPencilAlt, FaUser, FaUserAlt } from "react-icons/fa";
import Button from "../components/Button";
import EditProfile from "./EditProfile";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: profileData, isLoading: profileLoading } =
    useLoadProfileQuery();

  const [active, setActive] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 100);
  }, []);

  const navigate = useNavigate();

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

    if (profileLoading) {
      return <h1>Profile loading</h1>;
    }
  };
  return (
    <div className="relative h-screen">
      <div className="md:min-h-60 bg-gradient-to-b from-purple-400 to-purple-600  "></div>
      <div className="">
        <div
          className={`hidden md:block absolute left-[14%] lg:left-[22%] top-30 lg:min-w-4xl lg:min-h-72 bg-purple-100 rounded-lg shadow-lg shadow-purple-400 transition-all duration-500 ${
            active ? "scale-100" : "scale-0"
          }`}
        >
          <div className="absolute h-32 w-32 -top-10 left-56 lg:left-95 rounded-full shadow-2xl shadow-purple-400 bg-purple-100 overflow-hidden">
            <img
              src={
                profileData?.data?.profilePic ||
                "https://png.pngtree.com/png-clipart/20230817/original/pngtree-round-kid-avatar-boy-face-picture-image_8005285.png"
              }
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="inline-flex items-center justify-between w-full px-5 md:px-10 py-5">
            <Link
              to={"my-learning"}
              className="font-semibold text-gray-700 text-shadow-sm text-shadow-purple-200 shadow-lg cursor-pointer hover:shadow-purple-500 py-1 px-2 rounded-full transition-all duration-200 "
            >
              My Learning
            </Link>
            <p
              onClick={handleLogout}
              className="font-semibold text-gray-700 text-shadow-sm text-shadow-purple-200 shadow-lg cursor-pointer hover:shadow-purple-500 py-1 px-2 rounded-full transition-all duration-200 "
            >
              Logout
            </p>
          </div>
          <div className="w-full text-center mt-10 flex flex-col items-center gap-1">
            <h1 className="text-3xl font-semibold ">
              {profileData?.data?.name}
            </h1>
            <p className="font-semibold ">{profileData?.data?.email}</p>
            <p className="font-semibold ">
              {profileData?.data?.userRole.toUpperCase()}
            </p>
          </div>
          <div className="md:max-w-xl text-center mx-auto mt-5 flex flex-col items-center gap-4">
            <h1 className="font-bold text-xl underline shadow-lg inline-block shadow-purple-300 px-4 py-1 rounded-full ">
              Welcome to Your Learning Journey!
            </h1>
            <p className="text-slate-700 font-medium">
              Hello Learner! 🌸 This is your own space to learn, practice, and
              shine. Keep moving closer to your goals with every step.
            </p>
          </div>
          <div className="my-10" onClick={() => setEditProfile(true)}>
            <Button>Edit Profile</Button>
          </div>
        </div>
        <div className="container md:hidden bg-purple-100 py-10 flex gap-3 items-center flex-col">
          <h1 className="font-semibold border-b border-b-purple-500 w-full  text-center">
            Profile
          </h1>
          <div className="flex h-16 w-16 items-center justify-center  rounded-full bg-purple-500 overflow-hidden">
            <img
              src={`${
                profileData?.data?.profilePic ||
                "https://png.pngtree.com/png-clipart/20230817/original/pngtree-round-kid-avatar-boy-face-picture-image_8005285.png"
              }`}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* <FaUserAlt className="h-full w-full"/> */}
          </div>
          <div className="w-full px-5 text-sm">
            <h1 className="font-semibold text-slate-700">Name</h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              {profileData?.data?.name}
            </h1>
          </div>
          <div className="w-full px-5 text-sm">
            <h1 className="font-semibold text-slate-700">Email</h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              {profileData?.data?.email}
            </h1>
          </div>
          <div className="w-full px-5 text-sm">
            <h1 className="font-semibold text-slate-700">Role</h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              {profileData?.data?.userRole?.toUpperCase()}
            </h1>
          </div>
          <div className="w-full px-5 text-sm">
            <h1 className="font-semibold text-slate-700">Course Enrolled</h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              You haven't enrolled in any course yet!
            </h1>
          </div>
          <button
            onClick={() => setEditProfile(true)}
            className="bg-purple-500 px-2 py-1 rounded-full hover:bg-purple-600 text-slate-50 text-xs my-5"
          >
            Edit Profile
          </button>
        </div>
      </div>
      {editProfile && (
        <EditProfile
          userData={profileData?.data}
          close={() => setEditProfile(false)}
        />
      )}
    </div>
  );
};

export default Profile;
