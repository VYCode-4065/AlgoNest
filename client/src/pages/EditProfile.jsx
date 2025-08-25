import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const EditProfile = ({ close }) => {
  const handleImage = (e) => {
    console.log("something");
    // console.log(e.target.files[0]);
  };

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

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 bg-neutral-600/60 z-50 flex items-center justify-center transition-all ${
        active ? "scale-100" : "scale-0"
      } duration-300`}
    >
      <div
        className={`w-full mx-2 md:w-lg lg:w-xl bg-white rounded-lg shadow-purple-500/50 text-slate-800 `}
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
        <div className="py-10 grid gap-2 px-2">
          <div className="w-full px-5  bg-slate-200 py-5 rounded-lg">
            <h1 className="font-semibold text-slate-700">Name : </h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              Vishal Yadav
            </h1>
          </div>
          <div className="w-full px-5  bg-slate-200 py-5 rounded-lg">
            <h1 className="font-semibold text-slate-700">Email :</h1>
            <h1 className="mt-2 pl-5 font-medium text-slate-800">
              vishal@gmail.com
            </h1>
          </div>
          <div className="grid gap-3 px-5  bg-slate-200 py-5 rounded-lg">
            <h1 className="font-semibold text-slate-700">Profile Pic :</h1>

            <div className=" relative ml-2 flex h-16 w-16 items-center justify-center  rounded-full bg-purple-500 group ">
              <img
                src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-round-kid-avatar-boy-face-picture-image_8005285.png"
                alt=""
                className="h-full w-full object-contain"
              />
              {/* <FaUserAlt className="h-full w-full"/> */}
              <div className="absolute text-white p-2 rounded-full bg-purple-500  lg:scale-0 group-hover:scale-100 transition-transform duration-300">
                <label htmlFor="editImg" className="cursor-pointer">
                  <FaPencilAlt />
                </label>

                <input
                  onChange={handleImage}
                  type="file"
                  accept=".jpg,.png,.jpeg,.svg"
                  className="hidden"
                  id="editImg"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`px-10 py-1  w-fit mx-auto bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 te cursor-pointer hover:scale-105 `}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
