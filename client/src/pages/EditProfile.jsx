import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useUpdateProfileMutation } from "../store/api/authApi";
import toast from "react-hot-toast";

const EditProfile = ({ close, userData }) => {
  const [updateData, setUpdateData] = useState({
    name: userData?.name,
    email: userData?.email,
    userRole: userData?.userRole,
  });

  const [profilePic, setProfilePic] = useState("");

  const [active, setActive] = useState(false);

  const handleClose = () => {
    setActive(false);
    const tId = setTimeout(() => {
      close();
    }, 300);
  };

  useEffect(() => {
    const tId = setTimeout(() => {
      setActive(true);
    }, 10);
    return () => clearTimeout(tId);
  }, []);

  const [updateProfile, { data, isLoading, isSuccess, error, isError }] =
    useUpdateProfileMutation();

  const onPicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const isChange = Object.keys(updateData).some(
      (val) => updateData[val] !== userData[val]
    );

    if (!profilePic && !isChange) {
      return toast.error("At least one field is required to update !");
    }

    try {
      const formData = new FormData();

      formData.append("name", updateData.name);
      formData.append("email", updateData.email);
      formData.append("userRole", updateData.userRole);
      formData.append("profilePic", profilePic);

      const response = await updateProfile(formData);

      if (response?.data?.success) {
        close();
        return toast.success("Profile updated successfully !");
      }

      if (response?.error?.data?.error) {
        throw response.error?.data?.message;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 bg-neutral-600/60 dark:bg-slate-800/60 dark:text-slate-300 z-50 flex items-center justify-center transition-all ${
        active ? "scale-100" : "scale-0"
      } duration-300 `}
    >
      <div
        className={`w-full mx-2 md:w-lg lg:w-xl bg-white dark:bg-slate-800 dark:text-slate-300 rounded-lg shadow-purple-500/50 text-slate-800  overflow-hidden dark:border dark:border-slate-300`}
      >
        <div className="flex items-center justify-between px-5 py-2 font-semibold">
          <h1>Edit Profile</h1>
          <MdClose
            size={30}
            onClick={handleClose}
            className="cursor-pointer text-shadow-lg  hover:text-shadow-purple-700"
          />
        </div>
        <hr />
        <form
          className="py-10 grid gap-2 px-2 bg-inherit"
          onSubmit={handleUpdate}
        >
          <div className="w-full px-5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
            <h1 className="font-semibold text-inherit">Name : </h1>
            <input
              name="name"
              className="mt-2 pl-5 font-medium text-inherit w-full outline-none   px-3 py-1 rounded-full border border-purple-400"
              value={updateData?.name}
              onChange={(e) => {
                setUpdateData((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="w-full px-5 py-2 rounded-lg dark:bg-slate-800 dark:text-slate-200">
            <h1 className="font-semibold ">Email :</h1>
            <input
              name="email"
              className="mt-2 pl-5 font-medium  w-full outline-none  px-3 py-1 rounded-full border border-purple-400"
              value={updateData?.email}
              onChange={(e) => {
                setUpdateData((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
            />
          </div>
          
          <div className="w-full px-5  py-2 rounded-lg ">
            <h1 className="font-semibold ">Profile Pic :</h1>

            <div className="relative h-24 w-24 mt-4 rounded-full shadow-2xl shadow-purple-400 bg-purple-100 group overflow-hidden">
              <img
                src={
                  userData?.profilePic ||
                  "https://png.pngtree.com/png-clipart/20230817/original/pngtree-round-kid-avatar-boy-face-picture-image_8005285.png"
                }
                alt=""
                className="h-full w-full object-cover "
              />
              <div className=" absolute top-8 left-8 p-2 bg-purple-600 rounded-full text-white transition-all scale-0 group-hover:scale-100 duration-200 ">
                <label htmlFor="profileImage" className="cursor-pointer">
                  <FaPencilAlt size={18} />
                </label>
                <input
                  className="hidden"
                  name="userRole"
                  type="file"
                  id="profileImage"
                  accept=".jpg,.jpeg,.png,.avif,.svg"
                  onChange={onPicChange}
                />
              </div>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`px-10 py-2 mt-3  w-fit mx-auto bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 te cursor-pointer hover:scale-105 `}
          >
            {isLoading ? "Uploading...." : "Done"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
