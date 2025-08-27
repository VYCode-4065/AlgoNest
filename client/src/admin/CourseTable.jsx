import React, { useState } from "react";
import AddCourse from "./course/AddCourse";

const CourseTable = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Basics",
      price: 400,
      category: "Web Dev",
      isPublished: true,
    },
    {
      id: 2,
      title: "Node.js Fundamentals",
      price: 500,
      category: "Backend",
      isPublished: false,
    },
    {
      id: 3,
      title: "Advanced JavaScript",
      price: 2500,
      category: "Programming",
      isPublished: true,
    },
    {
      id: 4,
      title: "Express.js Crash Course",
      price: 1299,
      category: "Backend",
      isPublished: true,
    },
    {
      id: 5,
      title: "MongoDB for Beginners",
      price: 399,
      category: "Database",
      isPublished: false,
    },
    {
      id: 6,
      title: "Fullstack with MERN",
      price: 449,
      category: "Web Dev",
      isPublished: true,
    },
    {
      id: 7,
      title: "Docker Essentials",
      price: 799,
      category: "DevOps",
      isPublished: true,
    },
    {
      id: 8,
      title: "Kubernetes Guide",
      price: 2999,
      category: "DevOps",
      isPublished: false,
    },
    {
      id: 9,
      title: "GraphQL Basics",
      price: 299,
      category: "API",
      isPublished: true,
    },
    {
      id: 10,
      title: "TypeScript Mastery",
      price: 499,
      category: "Programming",
      isPublished: true,
    },
  ]);

  const [openAddCourse, setOpenAddCourse] = useState(false);

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
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-purple-50">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {course.title}
                </td>
                <td className="px-4 py-3">₹{course.price}</td>
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
      </div>
    </div>
  );
};

export default CourseTable;
