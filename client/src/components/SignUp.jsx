import React, { useState } from "react";
import Button from "./Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRegisterUserMutation } from "../store/api/authApi";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

const SignUp = ({ openLogin }) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordEyeOpen, setPasswordEyeOpen] = useState(false);
  const [confPasswordEyeOpen, setConfPasswordEyeOpen] = useState(false);

  const [signupUser, { isLoading, isError, data: signData, isSuccess }] =
    useRegisterUserMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!signupData.email || !signupData.name || !signupData.password) {
      return toast.error("All the credentials are required !");
    }

    if (signupData.password.length < 8) {
      return toast.error("Password should be atleast 8 character long !");
    }

    try {
      const res = await signupUser(signupData);

      setSignupData({
        name: "",
        email: "",
        password: "",
      });
      if (isSuccess) {
        openLogin(true);
        return toast.success(signData.message);
      }

      if (!res.data?.success) {
        throw "Currently unable to signup !";
      }
    } catch (error) {
      return toast.error(error);
    }

    setSignupData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className=" bg-gradient-to-tl backdrop-blur-md w-full lg:min-w-lg shadow-lg shadow-slate-700 rounded-lg py-5 px-5 grid gap-5 text-slate-200 border border-slate-200">
      <div className="px-2 flex flex-col items-center gap-2 mx-auto text-center">
        <div className="bg-gray-100 h-12  w-12 rounded-full  inline-flex items-center justify-center">
          <p className="flex items-center justify-center bg-purple-600/50 h-3 max-w-fit px-1 py-3 text-white rounded-full">
            <FaCheck />
          </p>
        </div>
        <h1
          className="relative inline-block pb-1 
           after:content-[''] after:absolute after:left-0 after:bottom-0 
           after:h-[2px] after:w-0 after:bg-slate-100 text-lg font-bold 
           after:transition-all after:duration-500 hover:after:w-full text-white"
        >
          Create Account
        </h1>
        <p className="  text-sm max-w-xs">
          Join us to start your learning journey.
        </p>
      </div>
      <form className="w-full grid " onSubmit={handleOnSubmit}>
        <div className="grid gap-2 w-full    rounded-lg mb-3">
          <label htmlFor="name" className="font-semibold">
            Full Name :{" "}
          </label>
          <input
            type="text"
            id="name"
            placeholder="Eg. Jhon Doe"
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={signupData.name}
            className="outline-none px-2 border border-purple-50 rounded-lg py-2 focus-within:bg-purple-100 focus-within:text-purple-900"
          />
        </div>
        <div className="grid gap-2 w-full  mb-3    rounded-lg">
          <label htmlFor="email" className="font-semibold">
            Email :{" "}
          </label>
          <input
            type="email"
            id="email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Eg. jhon@example.com"
            className="outline-none   border border-purple-50  px-2 rounded-lg py-2 focus-within:bg-purple-100 focus-within:text-purple-900"
          />
        </div>
        <div className="grid gap-2 w-full mb-3 rounded-lg">
          <label htmlFor="password" className="font-semibold">
            Password :{" "}
          </label>
          <div className="flex items-center justify-between   border border-purple-50 px-2 rounded-lg focus-within:bg-purple-100 focus-within:text-purple-900">
            <input
              type={`${passwordEyeOpen ? "text" : "password"}`}
              id="password"
              name="password"
              onChange={(e) =>
                setSignupData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={signupData.password}
              placeholder="Eg. xyz"
              className="outline-none  px-2  py-2  w-full"
            />
            <div
              className="cursor-pointer"
              onClick={() => setPasswordEyeOpen((prev) => !prev)}
            >
              {passwordEyeOpen ? <IoEye size={25} /> : <IoEyeOff size={25} />}
            </div>
          </div>
        </div>
        <div className="grid gap-2 w-full mb-3 rounded-lg">
          <label htmlFor="confpassword" className="font-semibold">
            Confirm Password :{" "}
          </label>
          <div className="flex items-center justify-between   border border-purple-50 px-2 rounded-lg focus-within:bg-purple-100 focus-within:text-purple-900">
            <input
              type={`${confPasswordEyeOpen ? "text" : "password"}`}
              id="confpassword"
              name="password"
              onChange={(e) =>
                setConfPasswordEyeOpen((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={signupData.confirmPassword}
              placeholder="Eg. xyz"
              className="outline-none  px-2  py-2  w-full"
            />
            <div
              className="cursor-pointer"
              onClick={() => setConfPasswordEyeOpen((prev) => !prev)}
            >
              {confPasswordEyeOpen ? (
                <IoEye size={25} />
              ) : (
                <IoEyeOff size={25} />
              )}
            </div>
          </div>
        </div>
        <p className="text-center">
          Already have an account ?{" "}
          <span
            onClick={openLogin}
            className="hover:text-purple-800 font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </p>
        <Button
          disabled={isLoading}
          className={
            "my-5 w-full m-auto bg-purple-100 text-purple-900 hover:bg-purple-800 hover:text-purple-200 font-semibold px-10 transition-all duration-500"
          }
        >
          {isLoading ? "Loading...." : "Sign up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
