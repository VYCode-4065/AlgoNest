import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import { MdClose, MdDelete } from "react-icons/md";
import {
  useDeleteLectureMutation,
  useGetLecturesQuery,
} from "../../store/api/lectureApi";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import { FaVideo, FaEdit } from "react-icons/fa";
import UpdateOneLecture from "./UpdateOneLecture";

const UpdateLecture = ({ closeAdd, courseData }) => {
  const {
    data: courseWithLecture,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLecturesQuery(courseData.courseId);

  const [openUpdateLecture, setOpenUpdateLecture] = useState(false);

  const [lectureData, setLectureData] = useState("");
  const [toUpdateLectureData, setToUpdateLectureData] = useState("");
  useEffect(() => {
    if (isSuccess) {
      setLectureData(courseWithLecture?.data?.lectures);
      toast.success(courseWithLecture?.message);
    }
    if (isError) {
      toast.error(courseWithLecture?.message);
    }
  }, [courseWithLecture]);

  const [
    deleteLecture,
    {
      data,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteIsError,
    },
  ] = useDeleteLectureMutation();

  const handleDeleteLecture = async (deletelectureId) => {
    try {
      const res = await deleteLecture({
        lectureId: deletelectureId,
        courseId: courseData.courseId,
      });

      if (res.data.success) {
        return toast.success(res.data?.message);
      }
    } catch (error) {
      console.log("error at delete lecture !");
    }
  };

  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const setTId = setTimeout(() => {
      setOpenAdd(true);
    }, 10);
    return () => clearTimeout(setTId);
  });
  return (
    <div
      className={
        "fixed bg-slate-50 dark:bg-slate-800 dark:text-slate-300 h-screen  bottom-0 right-0 left-0 container flex items-center justify-center w-full overflow-auto pt-16"
      }
    >
      <div
        className={`w-full h-full  px-5 pt-3 border border-purple-700    ${
          openAdd ? "scale-100" : "scale-0"
        } transition duration-200`}
      >
        <div className="flex items-center px-5 py-2 shadow-sm shadow-purple-600  font-semibold text-purple-800 dark:text-slate-300 rounded-lg">
          <h1 className="w-full">Update Lecture</h1>
          <MdClose
            className="cursor-pointer hover:bg-gray-700 transition duration-200 hover:text-slate-300 "
            onClick={closeAdd}
            size={25}
          />
        </div>
        <div className=" py-5 px-2">
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
          <div className=" px-2 py-5 font-semibold min-h-88">
            <label htmlFor="lecture-title" className="font-semibold">
              Lecture List :
            </label>
            {lectureData ? (
              lectureData.length === 0 ? (
                <p className="text-center  text-red-500 font-semibold text-lg mt-20">
                  No lecture found !
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="mt-5 text-left w-full border border-purple-200  bg-white dark:bg-slate-800 dark:text-slate-300 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                      <tr>
                        <th className="px-4 py-3">Sr. No.</th>
                        <th className="px-4 py-3">Lecture Title</th>
                        <th className="px-4 py-3">Thumbnail</th>
                        <th className="px-4 py-3">Video Link</th>
                        <th className="px-4 py-3">Is Preview</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {lectureData.map((lecture, idx) => (
                        <tr
                          key={lecture._id}
                          className="border-b hover:bg-purple-50 dark:hover:bg-slate-900 dark:bg-slate-900 transition duration-200"
                        >
                          <td className="px-4 py-3 font-medium ">
                            {idx + 1}
                          </td>
                          <td className=" px-4 py-3 font-medium ">
                            {lecture.lectureTitle}
                          </td>
                          <td className="px-4 py-3 group">
                            <FaImage size={24} />
                            <div className="fixed left-30 top-5 scale-0 group-hover:scale-100  max-h-2xl max-w-2xl bg-slate-700 transition duration-200 rounded-lg overflow-hidden">
                              <img
                                className="h-full w-full object-cover"
                                src={lecture.thumbnailUrl}
                                alt={lecture.lectureTitle}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 group">
                            <FaVideo size={24} />
                            {lecture.videoLink}
                            <div className="fixed focus-within:bg-pink-600 right-40 top-20 scale-0 group-hover:scale-100  max-full max-full md:min-h-1/2 md:min-w-2xl bg-red-600 transition duration-200">
                              <video
                                src={lecture.videoUrl}
                                className="w-full h-full object-cover"
                                muted
                                controls
                              ></video>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {lecture.isPreview ? (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px- py-3 flex items-center gap-1 ">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setToUpdateLectureData(lecture);
                                setOpenUpdateLecture(true);
                              }}
                              className=" hover:text-slate-200 hover:bg-purple-800 p-2 transition duration-200 cursor-pointer rounded-full"
                            >
                              <FaEdit size={20} />
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLecture(lecture._id);
                              }}
                              className=" hover:text-slate-200 hover:bg-red-800 p-2 transition duration-200 cursor-pointer rounded-full"
                            >
                              <MdDelete size={20} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <p>Something gone wrong</p>
            )}
          </div>
        </div>
      </div>
      {openUpdateLecture && (
        <UpdateOneLecture
          closeUpdate={() => setOpenUpdateLecture(false)}
          courseData={courseData}
          lectureData={toUpdateLectureData}
        />
      )}
    </div>
  );
};

export default UpdateLecture;
