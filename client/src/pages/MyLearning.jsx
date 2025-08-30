import React, { useState } from "react";

const MyLearning = () => {
  const [courseData, setCourseData] = useState([]);
  return (
    <div className="bg-slate-50  px-10 py-5 h-screen">
      <div>
        <h1 className="text-2xl font-bold ">Course Enrolled</h1>
        {courseData.length ? (
          courseData.map((_, idx) => {
            <div>Course</div>;
          })
        ) : (
          <p className="text-slate-600 mt-5">You are not enrolled in any course yet !</p>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
