import React, { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useLoginUserMutation } from "../store/api/authApi";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ closeLogin }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
    <div className=" bg-white w-full lg:min-w-lg shadow-lg shadow-slate-700  rounded-lg py-5 px-5 grid gap-5">
      <div className="px-2 flex flex-col gap-2 items-center">
        <div className="bg-gray-300 h-12  w-12 rounded-full  inline-flex items-center justify-center">
          <p className="inline-flex items-center justify-center bg-purple-600/50 h-3 max-w-fit px-1 py-3 text-white rounded-full">
            <FaCheck />
          </p>
        </div>
        <h1 className="text-center font-bold text-2xl transition-all duration-300  text-slate-800 hover:underline ">
          Welcome Back
        </h1>
        <p className=" text-gray-500 text-sm inline-block font-semibold">
          Sign in to continue your learning
        </p>
      </div>
      <form className="w-full grid " onSubmit={handleLogin}>
        <div className="grid gap-2 w-full  mb-3 rounded-lg">
          <label htmlFor="email" className="font-semibold">
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
            className="outline-none  px-2 rounded-lg py-2 border-purple-500 border-2"
          />
        </div>
        <div className="grid gap-2 w-full  mb-3 rounded-lg">
          <label htmlFor="password" className="font-semibold">
            Password :{" "}
          </label>
          <div className="flex bg-white items-center justify-between px-2 rounded-lg  border-2 border-purple-500">
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
              className="cursor-pointer"
              onClick={() => setEyeOpen((prev) => !prev)}
            >
              {eyeOpen ? <IoEye size={25} /> : <IoEyeOff size={25} />}
            </div>
          </div>
        </div>
        <div className="text-sm font-semibold text-neutral-500 flex items-center justify-between px-3">
          <div className="flex gap-1 items-center">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <p className="cursor-pointer text-sm font-semibold text-purple-400 hover:text-purple-500">
            Forgot Password ?
          </p>
        </div>
        <Button
          disabled={isLoading}
          className={
            "w-full my-5 m-auto bg-purple-700 hover:bg-purple-800 text-white font-semibold px-10"
          }
        >
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
        <p className="text-center">
          Don't have an account ?{" "}
          <span
            onClick={closeLogin}
            className="text-purple-800 font-semibold cursor-pointer "
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
