import React, { useState } from "react";
import AddCourse from "./course/AddCourse";
import { useGetCourseQuery } from "../store/api/courseApi";
import EditCourse from "./course/EditCourse";

const CourseTable = () => {
  // const [courses, setCourses] = useState([]);

  const { data: courses } = useGetCourseQuery();
  const [editCourseData, setEditCourseData] = useState({});

  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [openEditCourse, setOpenEditCourse] = useState(false);

  return (
    <div className="p-6 bg-purple-50 min-h-screen ">
      {openAddCourse && <AddCourse close={() => setOpenAddCourse(false)} />}
      {/* Add Course Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setOpenAddCourse(true)}
          className="w-full cursor-pointer py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 hover:scale-95 transition-all duration-200"
        >
          Add Course
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-purple-200 text-left bg-white rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-3">Course Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {courses?.data?.map((course) => (
              <tr
                key={course._id}
                className="border-b hover:bg-purple-50"
                onClick={(e) => {
                  setOpenEditCourse(true);
                  setEditCourseData(course);
                }}
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {course.courseTitle}
                </td>
                <td className="px-4 py-3">₹{course.coursePrice}</td>
                <td className="px-4 py-3">{course.category}</td>
                <td className="px-4 py-3">
                  {course.isPublished ? (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button className="px-4 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 cursor-pointer">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openEditCourse && (
          <EditCourse
            editCourseData={editCourseData}
            close={() => setOpenEditCourse(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CourseTable;
