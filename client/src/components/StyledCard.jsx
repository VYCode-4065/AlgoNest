import { Markup } from "interweave";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ imageUrl, title, description, courseId }) => {
  return (
    <div className="relative h-72 flex w-full flex-col rounded-xl bg-gradient-to-tr from-[#6000A1] to-[#DB0F64] bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 ">
        <img src={imageUrl} alt="" className="h-full w-full object-center" />
      </div>
      <div className="p-6 text-slate-100">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        <hr />
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {
            <Markup
              content={description}
              className="line-clamp-2 font-medium"
            />
          }
        </p>
      </div>
      <Link
        state={{ title, courseId }}
        to={`course/${title}`}
        className="p-6 pt-0 mx-auto"
      >
        <button
          data-ripple-light="true"
          type="button"
          className="select-none rounded-lg bg-gradient-to-br from-blue-800 to-cyan-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer hover:scale-95 duration-200"
        >
          Start Learning
        </button>
      </Link>
    </div>
  );
};

export default Card;
