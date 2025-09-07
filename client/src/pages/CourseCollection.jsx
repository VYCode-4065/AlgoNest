import React, { useEffect, useState } from "react";
import {
  useGetAllCoursesQuery,
  useGetCourseByCatMutation,
  useSearchCourseMutation,
} from "../store/api/courseApi";
import Card from "../components/Card";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { Markup } from "interweave";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const CourseCollection = () => {
  const { data: allCoursesData, isLoading: allCourseLoad } =
    useGetAllCoursesQuery();

  const [coursesData, setCoursesData] = useState([]);

  const categoryList = [
    "Frontend",
    "Backend",
    "Data Science",
    "Accounting",
    "Computer Science",
    "Programming Language",
    "Dev Tools",
    "Database",
    "Full Stack",
  ];

  const [checkCategoryData, setCheckedCategoryData] = useState([]);

  const [getCourseByCat, { data: catBackend }] = useGetCourseByCatMutation();

  const [searchCourse, {}] = useSearchCourseMutation();

  const [searchValue, setSearchValue] = useState("");

  const handlePriceFilter = (filterBase) => {
    const newArray = [...coursesData];
    if (filterBase === "low") {
      setCoursesData(newArray.sort((a, b) => a.coursePrice - b.coursePrice));
    } else {
      setCoursesData(newArray.sort((a, b) => b.coursePrice - a.coursePrice));
    }
  };
  const fetchCourseByCat = async () => {
    const catToFetch = checkCategoryData.map((val) => {
      return val.data;
    });

    if (checkCategoryData.length === 0 && !searchValue) {
      if (allCoursesData?.data) {
        setCoursesData(allCoursesData?.data);
      }
      return;
    }
    try {
      const res = await getCourseByCat(catToFetch);

      if (res.data?.success) {
        return setCoursesData(res.data?.data);
      }
    } catch (error) {
      console.log("Error at course collection !");
    }
  };

  const handleSearch = async (searchData) => {
    if (!searchData) {
      if (allCoursesData?.data) {
        setCoursesData(allCoursesData?.data);
      }
      return;
    }
    const setTid = setTimeout(async () => {
      try {
        const res = await searchCourse(searchData);
        if (res.data?.success) {
          setCoursesData(res.data?.data);
        }
      } catch (error) {
        console.log("Error at course collection search !");
      }
    }, 0);
  };


  useEffect(() => {
    const setTId = setTimeout(() => {
      fetchCourseByCat();
    }, 100);
    return () => clearTimeout(setTId);
  }, [checkCategoryData]);

  useEffect(() => {
    setCoursesData(allCoursesData?.data);
  }, [allCourseLoad]);

  return (
    <div className="grid lg:grid-cols-4 dark:bg-slate-800 dark:text-slate-300">
      <div className="hidden lg:block container border p-5 border-rose-100 ">
        <h1 className="text-lg text-purple-700 font-bold">Filters</h1>
        <hr />
        <div className="py-5 px-3">
          <h1 className="font-semibold text-lg">Price</h1>
          <div className="flex items-center gap-2">
            <h2>Sort By :</h2>
            <select
              className="bg-gray-200 dark:bg-slate-800 dark:border dark:border-slate-300 dark:text-slate-300 px-3 py-0.5 text-purple-800 rounded font-semibold cursor-pointer outline-none transition duration-300"
              name="price"
              id="priceFilter"
              onChange={(e) => handlePriceFilter(e.target.value)}
            >
              <option value="low" className="transition duration-300">
                Low to high
              </option>
              <option value="high" className="transition duration-300">
                High to low
              </option>
            </select>
          </div>
        </div>
        <div className="py-2 px-3">
          <div className="grid gap-3">
            <h1 className="text-lg font-semibold ">Categories</h1>
            <hr />

            <div className="shadow-2xl rounded-lg py-5 px-3">
              {categoryList.map((val, idx) => {
                return (
                  <div
                    onClick={() => {
                      if (checkCategoryData.find((cat) => cat.index == idx)) {
                        return setCheckedCategoryData((prev) =>
                          prev.filter((cat) => cat.index != idx)
                        );
                      }
                      setCheckedCategoryData((prev) => [
                        ...prev,
                        { data: val, index: idx },
                      ]);
                    }}
                    id={idx}
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <p
                      id={idx}
                      className="h-4 w-4 rounded border-2 border-purple-700"
                    >
                      {checkCategoryData?.find(
                        (checked) => checked.index == idx
                      ) && (
                        <FaCheck
                          className={`h-full w-full object-center text-white bg-purple-600`}
                        />
                      )}
                    </p>
                    <label id={idx} htmlFor={idx}>
                      {val}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="h-screen overflow-auto col-span-3">
        <div className="grid md:grid-cols-2 gap-3 md:gap-0 px-5 py-3 md:py-5 md:px-10 border-b-2 h-fit sticky top-0 z-20 bg-white dark:bg-slate-800 dark:text-slate-300 border-b-purple-500">
          <h1 className="text-lg font-bold px-5 text-purple-600 py-1 w-fit shadow-2xl rounded-full hover:shadow-purple-800 transition duration-300">
            Explore All Courses
          </h1>
          <div className="w-full flex items-center justify-between border rounded-full  bg-slate-50 text-white dark:bg-slate-800 dark:text-slate-300 overflow-hidden hover:shadow-md hover:shadow-purple-400  transition-all duration-200  border-purple-500">
            <input
              type="text"
              placeholder="Search Courses"
              onChange={(e) => handleSearch(e.target.value)}
              className="outline-none  w-full pl-5 text-neutral-900 dark:text-slate-200"
            />
            <button className="h-full px-5 py-1 md:py-2 cursor-pointer bg-purple-800 hover:font-medium">
              Search
            </button>
          </div>
        </div>
        <p className="inline-block mx-5 mt-2">
          Total Courses : {coursesData?.length}
        </p>
        <div className=" grid gap-5 py-10 md:px-5 px-3">
          {Array.isArray(coursesData) &&
            coursesData?.map((course, idx) => {
              return (
                <div
                  key={course._id || idx}
                  className="w-full rounded container border overflow-hidden  grid grid-cols-4 md:gap-5"
                >
                  <img
                    src={course.thumbnails}
                    className="h-full w-full object-center "
                    alt={course?.courseTitle}
                  />
                  <div className="text-left col-span-3 inline-grid gap-2 px-5 md:py-3 py-1">
                    {/* course title  */}
                    <h1 className="md:text-2xl font-bold">{course.courseTitle}</h1>
                    {/* course subtitle  */}
                    <p className="text-sm md:text- font-semibold">
                      Learn {course.courseTitle} from scratch !
                    </p>
                    {course.description !== "undefined" &&
                    course.description !== "" ? (
                      <Markup
                        className="line-clamp-2 text-xs md:text-sm"
                        content={course?.description}
                      />
                    ) : (
                      <span className="line-clamp-2 text-xs">
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
                        "text-sm px-2 md:py-1.5 border border-purple-600 rounded-full inline-block w-fit h-fit bg-purple-600 hover:bg-purple-700 text-slate-200 duration-200 font-medium"
                      }
                    >
                      Explore course
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CourseCollection;
