import React, { useEffect, useState } from "react";
import { TbInfoOctagon } from "react-icons/tb";
import { FaCirclePlay } from "react-icons/fa6";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import { Markup } from "interweave";
import { useGetCourseByIdMutation } from "../store/api/courseApi";
import LoadingSpinner from "../components/LoadingSpin";
import testVideo from "../assets/videos/testVideo.mp4";

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
                    <Link
                      className="px-3 py-2 shadow-md rounded-full bg-purple-600 hover:bg-purple-700 dark:border dark:border-slate-300 text-slate-100 transition duration-200"
                      to={"/checkout"}
                      state={courseData}
                    >
                      Enroll In Course
                    </Link>
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
