import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { MdClose } from "react-icons/md";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

import { useAddLectureMutation } from "../../store/api/lectureApi";
import toast from "react-hot-toast";

const AddLecture = ({ closeAdd, courseData }) => {
  const [newLectureData, setNewLectureData] = useState({
    courseId: courseData.courseId,
    lectureTitle: "",
    lectureSubtitle: "",
    videoLink: "",
    thumbnail: "",
    isPreview: false,
  });

  const [AddLecture, { data, isLoading, isSuccess }] = useAddLectureMutation();

  const handleAddLecture = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(newLectureData)) {
      formData.append(key, value);
    }

    try {
      const res = await AddLecture(formData);
      if (res.data.success) {
        toast.success(res.data?.message);
        return;
      }
      if (res.error.error) {
        throw res.error.message;
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      closeAdd();
    }
  };

  const [openAdd, setOpenAdd] = useState(false);

  const handleAddClose = () => {
    setOpenAdd(false);
    setTimeout(() => {
      closeAdd();
    }, 300);
  };
  useEffect(() => {
    const setTId = setTimeout(() => {
      setOpenAdd(true);
    }, 10);
    return () => clearTimeout(setTId);
  });
  return (
    <div
      onClick={handleAddClose}
      className="fixed bg-gray-800/50   top-10 bottom-0 right-0 left-0 container flex items-center justify-center w-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`lg:w-xl px-5 pt-3 border border-purple-700 dark:border-slate-200 rounded-sm bg-slate-50 dark:bg-slate-800 ${
          openAdd ? "scale-100" : "scale-0"
        } transition duration-200`}
      >
        <div className="flex items-center px-5 py-2 shadow-sm shadow-purple-600  font-semibold  rounded-lg">
          <h1 className="w-full">Add Lecture</h1>
          <MdClose
            className="cursor-pointer hover:bg-gray-700 transition duration-200 hover:text-slate-300 "
            onClick={closeAdd}
            size={25}
          />
        </div>
        <form onSubmit={handleAddLecture} className=" py-5 px-2">
          <div className="grid gap-2 px-2 py-1 font-semibold">
            <label htmlFor="title">
              Course Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={courseData.courseTitle || "No Course"}
              readOnly
              className="py-2 px-3 outline-none border border-purple-400 rounded-lg "
            />
          </div>
          <div className="grid gap-2 px-2 py-1 font-semibold">
            <label htmlFor="lecture-title">
              Enter Lecture Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="lecture-title"
              value={newLectureData.lectureTitle}
              onChange={(e) => {
                setNewLectureData((prev) => {
                  return {
                    ...prev,
                    lectureTitle: e.target.value,
                  };
                });
              }}
              placeholder="Enter lecture title"
              className="py-2 px-3 outline-none border border-purple-400 rounded-lg focus-within:bg-slate-200"
            />
          </div>
          <div className="grid gap-2 px-2 py-1 font-semibold">
            <label htmlFor="sub-title">Enter Lecture SubTitle</label>
            <input
              type="text"
              id="sub-title"
              value={newLectureData.lectureSubtitle}
              onChange={(e) => {
                setNewLectureData((prev) => {
                  return {
                    ...prev,
                    lectureSubtitle: e.target.value,
                  };
                });
              }}
              placeholder="Enter lecture sub title"
              className="py-2 px-3 outline-none border border-purple-400 rounded-lg focus-within:bg-slate-200"
            />
          </div>
          <div className="grid gap-2 px-2 py-1 font-semibold">
            <label htmlFor="thumbnail">
              Add Lecture Thumbnail <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => {
                setNewLectureData((prev) => {
                  return {
                    ...prev,
                    thumbnail: e.target.files[0],
                  };
                });
              }}
              accept=".jpg,.png,.jpeg,.avif,.svg"
              className="py-2 px-3 outline-none border border-purple-400 rounded-lg focus-within:bg-slate-200 cursor-pointer"
            />
          </div>
          <div className="grid gap-2 px-2 py-1 font-semibold">
            <label htmlFor="lecture-video">
              Add Lecture Video <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              id="lecture-video"
              onChange={(e) => {
                setNewLectureData((prev) => {
                  return {
                    ...prev,
                    videoLink: e.target.files[0],
                  };
                });
              }}
              className="py-2 px-3 outline-none border border-purple-400 rounded-lg focus-within:bg-slate-200 cursor-pointer"
              accept=".mp4,.mov,.avi,.wmv,.mkv,.webm,.flv"
            />
          </div>
          <div
            className="py-2 px-3 flex gap-2 items-center cursor-pointer"
            onClick={() =>
              setNewLectureData((prev) => {
                return {
                  ...prev,
                  isPreview: !prev.isPreview,
                };
              })
            }
          >
            <p
              className={`h-5 w-5 py-0.5 rounded-full border-2 border-purple-500 overflow-hidden ${
                newLectureData.isPreview ? "bg-purple-600" : ""
              }`}
            >
              {newLectureData.isPreview && (
                <FaCheck
                  size={14}
                  className="object-center m-auto  text-slate-200"
                />
              )}
            </p>
            <label htmlFor="freeCheck" className="font-semibold">
              Is this free
            </label>
          </div>

          <div className="mt-5">
            <Button type="submit">
              {isLoading ? "Loading..." : "Add Lecture to Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLecture;
