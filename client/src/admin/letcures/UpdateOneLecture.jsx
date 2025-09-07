import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useUpdateLectureMutation } from "../../store/api/lectureApi";
import toast from "react-hot-toast";

const UpdateOneLecture = ({ closeUpdate, lectureData, courseData }) => {
  const [updateLectureData, setupdateLectureData] = useState({
    lectureId: lectureData._id,
    lectureTitle: lectureData.lectureTitle,
    lectureSubtitle: lectureData.lectureSubtitle,
    videoUrl: "",
    thumbnailUrl: "",
    isPreview: lectureData.isPreview,
  });

  console.log(lectureData);

  const [openAdd, setOpenAdd] = useState(false);

  const [
    updateLecture,
    { data: updatedLectureData, isSuccess, isLoading, isError, error },
  ] = useUpdateLectureMutation();
  const handleUpdateLecture = async (e) => {
    e.preventDefault();

    const isChange = Object.values(updateLectureData).every((val) => val != "");
    if (!isChange) {
      return toast.error("All fields required !");
    }
    const formData = new FormData();

    for (const [key, value] of Object.entries(updateLectureData)) {
      formData.append(key, value);
    }

    try {
      const res = await updateLecture(formData);
      if (isSuccess) {
        toast.success(res.data?.message);
      }
      if (isError) {
        throw res.data?.message;
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeUpdate();
    }
  };

  
  const handleUpdateClose = () => {
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
      onClick={handleUpdateClose}
      className="fixed bg-gray-800/50  top-10 bottom-0 right-0 left-0 container flex items-center justify-center w-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`lg:w-xl px-5 pt-3 border border-purple-700 rounded-sm bg-slate-50 dark:bg-slate-800 ${
          openAdd ? "scale-100" : "scale-0"
        } transition duration-200 overflow-y-auto h-full pt-10`}
      >
        <div className="flex items-center px-5 py-2 shadow-sm shadow-purple-600  font-semibold text-purple-800 rounded-lg dark:text-slate-300a">
          <h1 className="w-full">Update Lecture</h1>
          <MdClose
            className="cursor-pointer hover:bg-gray-700 transition duration-200 hover:text-slate-300 "
            onClick={closeUpdate}
            size={25}
          />
        </div>
        <form onSubmit={handleUpdateLecture} className=" py-5 px-2">
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
              value={updateLectureData.lectureTitle}
              onChange={(e) => {
                setupdateLectureData((prev) => {
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
              value={updateLectureData.lectureSubtitle}
              onChange={(e) => {
                setupdateLectureData((prev) => {
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
            <div className="">
              <img
                src={lectureData.thumbnailUrl}
                alt={lectureData.lectureTitle}
                className="h-full w-full object-scale-down"
              />
            </div>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => {
                setupdateLectureData((prev) => {
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
            <div className="">
              <video
                src={lectureData.videoUrl}
                alt={lectureData.lectureTitle}
                className="h-full w-full object-scale-down"
                controls
              />
            </div>
            <input
              type="file"
              id="lecture-video"
              onChange={(e) => {
                setupdateLectureData((prev) => {
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
              setupdateLectureData((prev) => {
                return {
                  ...prev,
                  isPreview: !prev.isPreview,
                };
              })
            }
          >
            <p
              className={`h-5 w-5 py-0.5 rounded-full border-2 border-purple-500 overflow-hidden ${
                updateLectureData.isPreview ? "bg-purple-600" : ""
              }`}
            >
              {updateLectureData.isPreview && (
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Update Lecture"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOneLecture;
