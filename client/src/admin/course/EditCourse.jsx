import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "../../store/api/courseApi";
import DescriptionEditor from "../../components/Description";

const EditCourse = ({ close, editCourseData }) => {
  const [formData, setFormData] = useState({
    courseId: editCourseData._id,
    courseTitle: editCourseData.courseTitle,
    category: editCourseData.category,
    coursePrice: editCourseData.coursePrice,
    thumbnail: editCourseData.thumbnails || "",
    courseLevel: editCourseData.courseLevel,
    subTitle: editCourseData.subTitle || "",
    description: editCourseData.description || "",
    isPublished: editCourseData.isPublished,
  });

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

  const [openEditCourse, setOpenEditCourse] = useState(false);
  const handleClose = () => {
    setOpenEditCourse(false);
    setTimeout(() => {
      close();
    }, 200);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenEditCourse(true);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();

  const handleDeleteCourse = async () => {
    try {
      const res = await deleteCourse(editCourseData?._id);
      if (res.data?.success) {
        setFormData({
          courseTitle: "",
          category: "",
          coursePrice: "",
          thumbnail: "",
          level: "",
          subTitle: "",
          description: "",
          isPublished: false,
        });
        handleClose();
        return toast.success(res.data?.message);
      }
    } catch (error) {
      console.log("error at course delete !");
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [updateCourse, { data, isLoading, isError, isSuccess, error }] =
    useUpdateCourseMutation();

  const handleThumbnailChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        thumbnail: e.target.files[0],
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChange = Object.keys(formData).some(
      (val) => formData[val] !== editCourseData[val]
    );

    if (!isChange) {
      return toast.error("At least one field is required to update !");
    }
    const courseData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      courseData.append(key, value);
    }

    try {
      const res = await updateCourse(courseData);
      if (res.data?.success) {
        setFormData({
          courseTitle: "",
          category: "",
          coursePrice: "",
          thumbnail: "",
          level: "",
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
    <div className="fixed top-16 bottom-0 right-0 left-0 z-50 bg-slate-500  overflow-auto">
      <div
        className={`flex items-center justify-center min-h-screen bg-purple-100 dark:bg-slate-800 p-4`}
      >
        <div
          className={` bg-white dark:bg-slate-800 dark:border rounded-2xl shadow-lg p-8 w-full max-w-2xl  ${
            openEditCourse ? "scale-100" : "scale-0"
          } transition-transform duration-200`}
        >
          <div className="flex items-center justify-between px-5">
            <h2 className="sm:text-xl lg:text-2xl font-bold text-purple-700 mb-6">
              Edit Course
            </h2>
            <button
              onClick={handleClose}
              className="text-sm font-bold text-neutral-800 dark:text-slate-300 mb-6 cursor-pointer shadow-lg inline-block px-3 py-1 rounded-full hover:shadow-purple-600 hover:scale-105 transition-transform duration-300"
            >
              Cancel
            </button>
          </div>
          <hr className="mb-3" />

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-2 border border-purple-400 rounded-lg outline-none focus:ring-1 focus:ring-purple-500"
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
                required={true}
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
              {formData.thumbnail && (
                <div className="my-5 h-fit w-fit shadow-lg rounded-lg bg-slate-400 overflow-hidden">
                  <img
                    src={formData.thumbnail}
                    alt="thumbnail"
                    className="object-scale-down h-full w-full"
                  />
                </div>
              )}

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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Description
              </label>
              <DescriptionEditor
                defaultValue={formData.description}
                desData={(val) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      description: val,
                    };
                  });
                }}
              />
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
            <div className="grid md:grid-cols-2 gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className=" py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition cursor-pointer"
              >
                {isLoading ? "Loading..." : "Update Course"}
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={handleDeleteCourse}
                className="py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
              >
                {deleteLoading ? "Loading..." : "Delete Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
