import React, { useEffect, useState } from "react";
import { useGetByEnrolledIdQuery } from "../store/api/courseApi";
import StyledCard from "../components/StyledCard";

const MyLearning = () => {
  const [courseData, setCourseData] = useState([]);
  const {
    data: purchasedCourseData,
    isLoading,
    refetch,
  } = useGetByEnrolledIdQuery();

  useEffect(() => {
    refetch();
  }, []);
  
  useEffect(() => {
    setCourseData(purchasedCourseData?.data);
  }, [isLoading, purchasedCourseData]);

  return (
    <div className="bg-slate-200 px-10 py-5 md:h-screen dark:bg-slate-800 dark:text-slate-300">
      <div className="">
        <h1 className="text-2xl font-bold ">Course Enrolled</h1>
        {courseData?.length > 0 ? (
          <div className="md:flex items-center gap-5">
            {courseData.map((courseVal, idx) => {
              return (
                <div
                  key={idx}
                  className="max-w-70 mt-20 rounded hover:scale-105 duration-500"
                >
                  <StyledCard
                    courseId={courseVal._id}
                    imageUrl={courseVal?.thumbnails}
                    title={courseVal?.courseTitle}
                    description={courseVal?.description}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-600 mt-5 dark:text-slate-300">
            You are not enrolled in any course yet !
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
