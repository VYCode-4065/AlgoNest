import React, { useEffect, useState } from "react";
import { TbInfoOctagon } from "react-icons/tb";
import { FaCirclePlay } from "react-icons/fa6";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Markup } from "interweave";
import {
  useGetByEnrolledIdQuery,
  useGetCourseByIdMutation,
} from "../store/api/courseApi";
import LoadingSpinner from "../components/LoadingSpin";
import testVideo from "../assets/videos/testVideo.mp4";
import { useSelector } from "react-redux";
import { getProfileData } from "../features/authSlice";
import toast from "react-hot-toast";
import StyledBtn2 from "../components/StyledBtn2";
import StyledBtn from "../components/StyledBtn";

const CourseDetails = () => {
  const [fetchCourse, { isLoading }] = useGetCourseByIdMutation();

  const location = useLocation();

  const courseId = location.pathname.split("/")[2];

  const [courseData, setCourseData] = useState({});

  const handleFetchCourse = async () => {
    try {
      const res = await fetchCourse(courseId);
      if (res.data?.success) {
        setCourseData(res.data?.data);
        return;
      }

      if (res.error) {
        throw "Something gone wrong !";
      }
    } catch (error) {
      console.log("Error at fetch course");
    }
  };

  const { data: purchasedCourseData, isLoading: enrollLoading } =
    useGetByEnrolledIdQuery();

  const [isPurchased, setIsPurchsed] = useState(false);

  useEffect(() => {
    const purchaseData = purchasedCourseData?.data;
    const isPurchase =
      Array.isArray(purchaseData) &&
      purchaseData?.find((val) => val._id === courseData._id);
    setIsPurchsed(isPurchase && true);
  }, [isLoading, enrollLoading]);

  const { user } = useSelector(getProfileData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        toast.error("Login/Signup required !");
        navigate("/auth");
      }, 0);
    }
  }, []);

  useEffect(() => {
    handleFetchCourse();
  }, [location.pathname]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const updatedAt = formatDate(courseData.updatedAt);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container dark:bg-slate-800 dark:text-slate-300">
          <div
            className={`bg-gradient-to-tr from-blue-800 via-purple-600 to-purple-800 dark:from-blue-800 dark:via-purple-600 dark:to-purple-700 text-slate-50 min-h-60 px-5 lg:px-30 py-10  text-center `}
          >
            <div className="lg:max-w-xl text-left">
              <h1 className="font-bold text-2xl">
                Mastering{" "}
                {courseData?.courseTitle + " Course" ||
                  "Mastering Next.js: Full-Stack Web Development"}
              </h1>
              <p className="font-semibold text-lg">
                {courseData?.subTitle ||
                  "Build Scalable, Modern Web Apps with React & Next.js"}
              </p>
              <p>
                Created By :{" "}
                <span className="text-blue-400 underline">
                  {courseData?.courseCreator?.name || "Vishal Yadav"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <TbInfoOctagon />
                <span> Last updated : {updatedAt || "2024-10-20"}</span>
              </p>
              <p>Student enrolled : {courseData.enrolledStudent?.length}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 px-5 lg:px-20 py-10 gap-10 lg:gap-0">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl">Description</h1>
              {courseData.description !== "undefined" &&
              courseData.description !== "" ? (
                <Markup content={courseData?.description} />
              ) : (
                `The ${courseData?.courseTitle} course is designed to give learners a strong foundation in both the basics and advanced concepts. 
            Throughout this course, you will work on practical examples and real-world scenarios that make learning engaging. 
            It is structured in a way that beginners can easily follow, while also providing valuable insights for experienced learners. 
            By the end, you will be confident in applying the skills learned to projects, interviews, and real-life problem-solving. 
            This course ensures a perfect balance of theory, practice, and hands-on experience to help you grow in your career.
`
              )}
              <div className=" shadow-2xl p-2 shadow-slate-400 rounded-lg">
                <h1 className="font-bold text-xl">Course Content</h1>
                <p className="text-sm text-gray-500 p-2">4 lectures</p>
                <div className="px-3">
                  <p className="flex gap-2 my-2 items-center">
                    <FaCirclePlay />
                    Introduction to Next.js
                  </p>
                  <p className="flex gap-2 my-2 items-center">
                    <FaCirclePlay /> Setting Up Your Next.js Development
                    Environment
                  </p>
                  <p className="flex gap-2 my-2 items-center">
                    <FaCirclePlay /> Routing in Next.js
                  </p>
                  <p className="flex gap-2 my-2 items-center">
                    <FaCirclePlay /> Server-Side Rendering (SSR) and Static Site
                    Generation (SSG)
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:px-30 shadow-md">
              <div className=" rounded-lg overflow-hidden  shadow-2xl dark:shadow-md  dark:shadow-purple-800 ">
                <video className="" src={testVideo} controls></video>
                <h1 className="font-bold pt-10 pb-2 px-5">
                  Introduction to Next Js
                </h1>
                <hr />
                <div className="font-bold py-2 px-5 grid gap-5  ">
                  <p>₹599</p>
                  <div className="py-5">
                    {isPurchased ? (
                      <Link
                        to={"/my-learning"}
                        className="text-sm border px-5 py-2 rounded-full bg-gradient-to-br from-[#180161]  via-purple-800 via-40% from-0% to-[#DB0F64] to-100% shadow-lg shadow-pink-800 hover:shadow-none hover:scale-y-105 duration-300 transition-all"
                      >
                        Start Learning
                      </Link>
                    ) : (
                      <Link to={"/checkout"} state={courseData}>
                        <StyledBtn2
                          firstVal={"Enroll Course"}
                          secondVal={"Pay Now"}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
