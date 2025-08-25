import React from "react";

const SkeletonCard = () => {
  return (
    <div className=" overflow-hidden rounded-lg dark:bg-gray-500 bg-white shadow-lg p-4 animate-pulse ">
      {/* Image Skeleton */}
      <div className="w-full h-36 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      <div className="mt-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Author Section */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Badge Skeleton */}
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Price Skeleton */}
        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
