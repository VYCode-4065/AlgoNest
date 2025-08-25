import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../utils/isAuthenticated";
import authImage from '../../public/authImage.avif'

const Authentication = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.login);


  useEffect(() => {
    setIsLogin(location.state?.login);
  }, [location.state]);
  return (
    <div className=" flex items-center gap-3 justify-center flex-col  my-auto pt-5 pb-3 px-5  transition-all duration-300">
      <div className="grid lg:grid-cols-2 gap-2 w-full">
        <div className="grid w-full  md:max-w-lg mx-auto gap-1 my-auto transition-all duration-500">
          {isLogin ? (
            <Login closeLogin={() => setIsLogin(false)} />
          ) : (
            <Signup openLogin={() => setIsLogin(true)} />
          )}
        </div>
        <div className=" w-full hidden lg:block  relative">
          <div className="h-[80vh] rounded-2xl overflow-hidden">
            <img
              src={authImage}
              alt="study"
              className="object-cover  h-full w-full  bg-indigo-500/70"
            />
          </div>
          <div className="absolute translate-x-20 bottom-20 rotate-5 bg-purple-500/80 p-5 text-gray-200 text-4xl font-semibold inline-block max-w-xl rounded-lg text-shadow-lg text-shadow-purple-600">
            <p>
              “Every great programmer was once a beginner. Let’s begin
              together!”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
