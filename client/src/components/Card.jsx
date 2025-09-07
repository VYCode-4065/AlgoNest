import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Card = ({
  imageLink,
  name,
  subTitle,
  author,
  level,
  price,
  authorImage,
  courseId,
}) => {
  return (
    <Link
      to={`/course-details/${courseId}`}
      className="border bg-neutral-200 dark:bg-slate-800 dark:border-slate-200 dark:text-slate-300  overflow-hidden rounded-lg  text-gray-700 shadow-lg hover:shadow-purple-800 hover:scale-105 transform  transition-all duration-500 w-full  md:max-w-72  cursor-pointer"
    >
      {/* Course Image */}
      <div className="relative bg-white -lg text-center overflow-hidden">
        <img
          src={imageLink}
          alt={imageLink}
          className="w-full inline-block h-40  object-center bg-white overflow-hidden"
        />
      </div>
      {/* Card Content */}
      <div className="py-2 pt-3 px-3 space-y-2">
        {/* Author + Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
              <img
                className="aspect-square h-full w-full"
                src={authorImage}
                alt={author}
              />
            </span>
            <h1 className="font-medium text-xs">{author}</h1>
          </div>

          <div
            className="inline-flex items-center border font-semibold transition-colors 
            focus:outline-none focus:ring-2  focus:ring-offset-2 border-transparent 
            shadow hover:bg-blue-700 bg-purple-600 text-white px-2 py-0.5 text-[10px] rounded-full"
          >
            {level}
          </div>
        </div>
        <hr />
        <div className=" font-semibold text-black dark:text-slate-300">
          <h1 className=" text-sm truncate">{name}</h1>
          <div className="flex items-center justify-between">
            <h1 className="font-medium  text-xs truncate">
              {(subTitle !== "undefined" && subTitle) ||
                `Learn ${name} from scratch `}
            </h1>

            <span>₹{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
