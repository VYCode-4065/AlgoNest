import React, { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useLoginUserMutation } from "../store/api/authApi";
import { FaCheck, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ForgetPassword from "../pages/ForgetPassword";
import GoogleAuth from "../pages/GoogleAuth";
import { useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";

const Login = ({ closeLogin }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const [forgetPassword, setForgetPassword] = useState(false);

  const [eyeOpen, setEyeOpen] = useState(false);

  const navigate = useNavigate();

  const [
    loginUser,
    { isLoading, isError, isSuccess, data, error: loginError },
  ] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return toast.error("Please provide all the credentials !");
    }

    try {
      const inputvalue = loginData;
      const res = await loginUser(inputvalue);

      setLoginData({
        email: "",
        password: "",
      });
      if (res?.data?.success) {
        localStorage.setItem("isLogin", true);
        navigate("/");
        return toast.success(res.data.message);
      }

      if (res?.error?.data?.error) {
        throw res.error.data.message;
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <div className=" border border-slate-300 backdrop-blur-lg w-full lg:min-w-lg   rounded-lg py-5 px-5 grid gap-5 text-gray-200 hover:shadow-2xl hover:shadow-purple-800 duration-200">
      <div className="px-2 flex flex-col gap-2 items-center ">
        <div className="bg-gray-50 h-12  w-12 rounded-full  inline-flex items-center justify-center">
          <p className="inline-flex items-center justify-center bg-purple-600 h-3 max-w-fit px-1 py-3 text-white rounded-full ">
            <FaCheck />
          </p>
        </div>
        <h1
          className="relative inline-block pb-1 
           after:content-[''] after:absolute after:left-0 after:bottom-0 
           after:h-[2px] after:w-0 after:bg-slate-100 text-lg font-bold 
           after:transition-all after:duration-500 hover:after:w-full text-white"
        >
          Welcome Back
        </h1>
        <p className="  text-sm inline-block font-semibold">
          Sign in to continue your learning
        </p>
      </div>
      <form className="w-full grid " onSubmit={handleLogin}>
        <div className="grid gap-2 w-full  mb-3 rounded-lg">
          <label htmlFor="email" className="font-semibold ">
            Email Address :{" "}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            value={loginData.email}
            placeholder="Eg. jhon@example.com"
            className="outline-none  px-2 rounded-lg py-2 border-gray-200 border focus-within:bg-purple-100 focus-within:text-purple-800"
          />
        </div>
        <div className="grid gap-2 w-full  mb-3 rounded-lg">
          <label htmlFor="password" className="font-semibold ">
            Password :{" "}
          </label>
          <div className="flex focus-within:text-purple-800 focus-within:bg-white items-center justify-between px-2 rounded-lg  border border-gray-200">
            <input
              type={`${eyeOpen ? "text" : "password"}`}
              id="password"
              name="password"
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={loginData.password}
              placeholder="Eg. xyz"
              className="outline-none px-2 py-2 w-full "
            />
            <div
              className="cursor-pointer hover:text-purple-700"
              onClick={() => setEyeOpen((prev) => !prev)}
            >
              {eyeOpen ? <IoEye size={25} /> : <IoEyeOff size={25} />}
            </div>
          </div>
        </div>
        <div className="text-sm font-semibold  flex items-center justify-between px-3">
          <div className="flex gap-1 items-center">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <p
            onClick={() => setForgetPassword(true)}
            className="cursor-pointer text-sm font-semibold  hover:text-purple-500"
          >
            Forgot Password ?
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={
            "w-full mt-3 mb-1 m-auto bg-purple-200 text-purple-700 hover:bg-purple-800 hover:text-white font-semibold px-10 border-2 border-purple-500 backdrop-blur-sm"
          }
        >
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
        <h1 className="text-center font-semibold ">OR</h1>
        <div className="w-full my-2 flex justify-center">
          <GoogleAuth />
        </div>
        <p className="text-center">
          Don't have an account ?{" "}
          <span
            onClick={closeLogin}
            className="hover:text-purple-800 font-semibold cursor-pointer hover:underline transition-all duration-200"
          >
            Sign up
          </span>
        </p>
      </form>
      {forgetPassword && (
        <ForgetPassword close={() => setForgetPassword(false)} />
      )}
    </div>
  );
};

export default Login;
