import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const AddCourse = ({ close }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    thumbnail: "",
    level: "",
    subtitle: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", formData);
    alert("Course submitted successfully!");
    setFormData({
      title: "",
      category: "",
      price: "",
      thumbnail: "",
      level: "",
      subtitle: "",
      description: "",
      isPublished: false,
    });
  };

  return (
    <div className="fixed top-16 bottom-0 right-0 left-0 z-50 bg-slate-500 overflow-auto">
      <div
        className={`flex items-center justify-center min-h-screen bg-purple-100 p-4`}
      >
        <div
          className={` bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl  ${
            openAddCourse ? "scale-100" : "scale-0"
          } transition-transform duration-200`}
        >
          <div className="flex items-center justify-between px-5">
            <h2 className="sm:text-xl lg:text-2xl font-bold text-purple-700 mb-6">
              Add New Course
            </h2>
            <button
              onClick={handleClose}
              className="text-sm font-bold text-neutral-800 mb-6 cursor-pointer shadow-lg inline-block px-3 py-1 rounded-full hover:shadow-purple-600 hover:scale-105 transition-transform duration-300"
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
                name="title"
                value={formData.title}
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
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Price *
              </label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Course Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-400 rounded-lg outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="" hidden>
                  Select Price Level
                </option>
                <option value="beginner">Beginner</option>
                <option value="medium">Medium</option>
                <option value="advance">Advance</option>
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
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
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
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
            >
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
