import React from "react";

const Card = ({imageLink,name}) => {
  const image ="https://res.cloudinary.com/dkigyluv4/image/upload/v1729413594/rrxdvyrcxxiladzry1jb.jpg";

  const title = "Mastering Docker: From Beginner to Pro";
  const link = "/course-details/6714c14616ae690eefd23b92";
  const author = "Vishal MernStack";
  const authorImage ="https://res.cloudinary.com/dkigyluv4/image/upload/v1730988021/vqwqxcdhxsq4sqzhqhlq.webp";
  const level = "Beginner";
  const price = "₹499";
  return (
    <div className="border  overflow-hidden rounded-lg  bg-purple-200/70 shadow-lg hover:shadow-purple-800 transform hover:scale-95 transition-all duration-300 w-full  md:max-w-xs">
      {/* Course Image */}
      <div className="relative p-5">
        <img
          src={imageLink}
          alt={title}
          className="w-full h-32 object-center rounded-t-lg "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg"></div>
      </div>

      {/* Card Content */}
      <div className="p-6 px-5 py-4 space-y-3">
        <a href={link}>
          <h1 className="hover:underline font-bold text-lg truncate">
            {name}
          </h1>
        </a>

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
            <h1 className="font-medium text-sm">{author}</h1>
          </div>

          <div
            className="inline-flex items-center border font-semibold transition-colors 
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent 
            shadow hover:bg-blue-700 bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
          >
            {level}
          </div>
        </div>

        {/* Price */}
        <div className="text-lg font-bold">
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
