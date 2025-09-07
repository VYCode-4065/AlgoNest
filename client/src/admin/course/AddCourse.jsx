import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useAddCourseMutation } from "../../store/api/courseApi";
import toast from "react-hot-toast";
import DescriptionEditor from "../../components/Description";

const AddCourse = ({ close }) => {
  const categoryList = [
    "Frontend",
    "Backend",
    "Data Science",
    "Accounting",
    "Computer Science",
    "Programming Language",
    "Dev Tools",
    "Database",
    "Full Stack"
  ];
  const [formData, setFormData] = useState({
    courseTitle: "",
    category: "",
    coursePrice: "",
    thumbnail: "",
    courseLevel: "",
    subTitle: "",
    description: "",
    isPublished: false,
  });

  const [openAddCourse, setOpenAddCourse] = useState(false);

  const handleClose = () => {
    setOpenAddCourse(false);
    setTimeout(() => {
      close();
    }, 200);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenAddCourse(true);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleThumbnailChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        thumbnail: e.target.files[0],
      };
    });
  };
  const [
    addCourse,
    { data: courseData, isLoading, isSuccess, isError, error: courseError },
  ] = useAddCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      courseData.append(key, value);
    }

    try {
      const res = await addCourse(courseData);

      console.log(res.data);
      if (res.data?.success) {
        setFormData({
          courseTitle: "",
          category: "",
          coursePrice: "",
          thumbnail: "",
          courseLevel: "",
          subTitle: "",
          description: "",
          isPublished: false,
        });
        handleClose();
        return toast.success(res.data?.message);
      }

      if (isError) {
        throw courseError;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-16 bottom-0 right-0 left-0 z-50 bg-slate-500 overflow-auto">
      <div
        className={`flex items-center justify-center min-h-screen bg-purple-100 p-4  dark:bg-slate-800`}
      >
        <div
          className={` bg-white  dark:bg-slate-800 dark:border rounded-2xl shadow-lg p-8 w-full max-w-2xl  ${
            openAddCourse ? "scale-100" : "scale-0"
          } transition-transform duration-200`}
        >
          <div className="flex items-center justify-between px-5">
            <h2 className="sm:text-xl lg:text-2xl font-bold text-purple-700 mb-6">
              Add New Course
            </h2>
            <button
              onClick={handleClose}
              className="text-sm font-bold text-neutral-800 dark:text-slate-300 mb-6 cursor-pointer shadow-lg inline-block px-3 py-1 rounded-full hover:shadow-purple-600 hover:scale-105 transition-transform duration-300"
            >
              Cancel
            </button>
          </div>
          <hr className="mb-3" />

          <form onSubmit={handleSubmit} className="space-y-6 dark:text-slate-300">
            {/* Course Title */}
            <div>
              <label className="block text-purple-700 font-medium mb-2 ">
                Course Title *
              </label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                placeholder="Enter course title..."
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-400 rounded-lg outline-none focus:ring-1 focus:ring-purple-500 dark:bg-slate-800 dark:border"
              >
                <option value="" hidden>
                  Select Category
                </option>
                {categoryList.map((val, idx) => {
                  return (
                    <option value={val} key={idx}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Price *
              </label>
              <input
                type="text"
                name="coursePrice"
                required
                value={formData.coursePrice}
                onChange={handleChange}
                placeholder="Enter course price"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Course Level *
              </label>
              <select
                name="courseLevel"
                value={formData.courseLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-400 rounded-lg outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="" hidden>
                  Select Price Level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advance">Advance</option>
              </select>
            </div>

            {/* Optional Fields */}
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleThumbnailChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Description
              </label>
              <div>
                <DescriptionEditor
                  desData={(val) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        description: val,
                      };
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-purple-700 font-medium">
                Publish this course
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition cursor-pointer"
            >
              {isLoading ? "Loading..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
