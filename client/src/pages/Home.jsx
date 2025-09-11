import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import { useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useSearchCourseMutation,
} from "../store/api/courseApi";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import StyledBtn from "../components/StyledBtn";
import Loader from "../components/Loader";
import LoadingSpinner from "../components/LoadingSpin";
import WhatsAppPlug from "../components/WhatsAppPlug";

const Home = () => {
  const { data: coursesData, isLoading } = useGetAllCoursesQuery();

  const [searchCourse, { isLoading: searchLoading }] =
    useSearchCourseMutation();
  const [searchData, setSearchData] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [openSearchPage, setOpenSearchPage] = useState(false);

  const handleSearch = async () => {
    if (!searchData) {
      return toast.error("Provide search value !");
    }
    setSearchResult([]);

    try {
      const res = await searchCourse(searchData);

      if (res.data?.success) {
        setSearchResult(res.data?.data);
      }
    } catch (error) {
      console.log("Error at home search !");
    } finally {
      setOpenSearchPage(true);
      setSearchData("");
    }
  };
  return (
    <div className="dark:bg-slate-800 dark:text-slate-300 relative">
      <div
        className={`bg-gradient-to-tr from-[hsl(278,96%,36%)] from-0% via-[#b50497] via-50% to-[#7900a5] to-100%  text-slate-50 min-h-32 px-5 lg:px-10 py-10 md:py-16 text-center dark:bg-slate-800`}
      >
        <div className="inline-flex flex-col gap-5 lg:w-2xl items-center ">
          <h1 className="md:text-2xl lg:text-4xl font-semibold">
            Find the Best Courses for You
          </h1>
          <p className="text-purple-100 text-sm md:text-lg">
            Discover, Learn, and Upskill with our wide range of courses
          </p>
          <div className="w-full flex items-center justify-between border rounded-full  bg-slate-50 dark:bg-slate-800  text-white overflow-hidden hover:shadow-lg   hover:shadow-purple-400  transition-all duration-200 ">
            <input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Search Courses"
              className="outline-none w-full pl-5 text-neutral-900 dark:text-slate-300"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
              className="h-full px-5 py-1 md:py-2 cursor-pointer bg-purple-800 hover:font-medium"
            >
              Search
            </button>
          </div>
          <Link to={"/courses"}>
            <StyledBtn>Explore Courses</StyledBtn>
          </Link>
        </div>
      </div>
      <div className="relative">
        <div
          className={`${
            !openSearchPage && "hidden"
          } absolute top-0 z-50 w-full min-h-40 bg-white dark:bg-slate-800 border transition duration-100`}
        >
          <div className=" flex flex-col gap-3 py-5">
            <div className="flex items-center justify-between font-bold text-lg px-10">
              <h1>Search Results</h1>
              <MdClose
                size={25}
                onClick={() => setOpenSearchPage(false)}
                className="cursor-pointer"
              />
            </div>
            <hr />

            <section className=" w-full  error section container text-purple-700 dark:text-slate-300  px-5 py-3 rounded ">
              {searchLoading ? (
                <div className="mx-auto text-center">
                  <div className="h-12 w-12 border-3 border-black border-t-pink-700 rounded-full animate-spin mx-auto "></div>
                  <div>
                    <h1 className="font-semibold my-5 animate-bounce text-lg">
                      Searching course . Please wait....
                    </h1>
                  </div>
                </div>
              ) : searchResult.length > 0 ? (
                <div className="w-full grid gap-5 py-10 md:px-5 max-h-screen overflow-y-auto transition-all duration-300">
                  {Array.isArray(searchResult) &&
                    searchResult?.map((course, idx) => {
                      return (
                        <div
                          key={course._id || idx}
                          className="w-full rounded container border overflow-hidden py-5 px-5 grid grid-cols-4 gap-5 "
                        >
                          <img
                            src={course.thumbnails}
                            className="h-45 w-full"
                            alt={course?.courseTitle}
                          />
                          <div className="text-left col-span-3 grid gap-2 px-5">
                            {/* course title  */}
                            <h1 className="text-2xl font-bold">
                              {course.courseTitle}
                            </h1>
                            {/* course subtitle  */}
                            <p className="font-semibold">
                              Learn {course.courseTitle} from scratch !
                            </p>
                            {course.description !== "undefined" &&
                            course.description !== "" ? (
                              <Markup
                                className="line-clamp-2"
                                content={course?.description}
                              />
                            ) : (
                              <span className="line-clamp-2">
                                {`The ${course?.courseTitle} course is designed to give learners a strong foundation in both the basics and advanced concepts. 
                                      Throughout this course, you will work on practical examples and real-world scenarios that make learning engaging. 
                                      It is structured in a way that beginners can easily follow, while also providing valuable insights for experienced learners. 
                                      By the end, you will be confident in applying the skills learned to projects, interviews, and real-life problem-solving. 
                                      This course ensures a perfect balance of theory, practice, and hands-on experience to help you grow in your career.`}
                              </span>
                            )}
                            <Link
                              to={`/course-details/${course._id}`}
                              className={
                                "bg-purple-600 border w-fit border-slate-500 text-slate-50 hover:bg-purple-700 transition duration-300 px-2 py-1 rounded-full mt-2"
                              }
                            >
                              Explore course
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <h1 className="text-center font-semibold text-lg">
                  No Search result found !
                </h1>
              )}
            </section>
          </div>
        </div>
      </div>
      <div className="px-3 py-5">
        <h1 className=" md:text-2xl lg:text-3xl font-semibold text-center">
          Our Courses
        </h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 lg:gap-x-3 lg:gap-y-10 gap-2 py-10 md:px-2 lg:px-5">
          {isLoading
            ? Array(10)
                .fill(1)
                .map((_, idx) => {
                  return <SkeletonCard />;
                })
            : coursesData?.data?.map((course, idx) => {
                if (idx >= 15) return;
                return (
                  <Card
                    name={course.courseTitle}
                    subTitle={course.subTitle}
                    imageLink={course.thumbnails}
                    key={idx}
                    courseId={course._id}
                    author={course.courseCreator.name}
                    authorImage={course.courseCreator.profilePic}
                    level={course.courseLevel}
                    price={course.coursePrice}
                  />
                );
              })}
        </div>
      </div>
      <div className="absolute bottom-5 right-3 ">
        <WhatsAppPlug />
      </div>
    </div>
  );
};

export default Home;
