import React from "react";

const Button = ({ disabled, className = undefined, children, onClick }) => {
  const defaultCss = `bg-purple-700 hover:bg-purple-800 f text-white max-w-fit block mx-auto `;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-5 py-2 border border-slate-500 rounded-lg cursor-pointer font-semibold transition-all duration-200 ${
        className !== undefined ? className : defaultCss
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
