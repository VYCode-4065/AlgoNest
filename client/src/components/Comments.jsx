import React from "react";

const Comment = ({ avatarUrl, username, timestamp, text }) => {
  return (
    <div className="max-w-full mx-auto bg-purple-50 dark:bg-slate-800 rounded-lg p-4 shadow-md border border-purple-200 dark:text-slate-300">
      <div className="flex items-center mb-3">
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full border-2 border-purple-400"
        />
        <div className="ml-3">
          <p className="text-purple-800 dark:text-slate-200 font-semibold">
            {username}
          </p>
          <p className="text-purple-500 text-sm dark:text-slate-300">
            {timestamp}
          </p>
        </div>
      </div>
      <p className="text-purple-700 dark:text-slate-400">{text}</p>
    </div>
  );
};

export default Comment;
