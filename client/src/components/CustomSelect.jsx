import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CustomSelect({
  roundedValue = "2xl",
  backgroundColor = "white",
  textColor = "white",
  label = "Select Option",
  setSelectedOption,
  placeholder = "Select...",
  options = [
    { value: "js", label: "JavaScript" },
    { value: "ts", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "node", label: "Node.js" },
  ],
  multiple = false,
  helperText,
  error = false,
  className,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-left rounded-${roundedValue} border transition-all
          bg-${backgroundColor}
           focus:outline-none
           ${textColor}
          pl-3 pr-2 py-1
          cursor-pointer
          border-zinc-200 
          ${
            error
              ? "border-rose-400 focus:border-rose-500 ring-rose-200/60"
              : ""
          }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-slate-200">{placeholder}</span>
          <SvgChevronDown
            className={`h-5 w-5 transition-transform text-${textColor} 'text-purple-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {helperText && (
        <p
          className={`mt-1 text-xs ${
            error ? "text-rose-500" : "text-zinc-500 'text-zinc-400"
          }`}
        >
          {helperText}
        </p>
      )}

      {open && (
        <div
          className="absolute z-50 mt-2 w-full overflow-auto rounded-lg border
            bg-purple-500 'bg-zinc-900 border-zinc-200 
            
            shadow-xl ring-1 ring-zinc-900/5"
          style={{ maxHeight: "280px" }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(opt.label);
                setOpen(false)
              }}
              className="group cursor-pointer select-none px-3 py-2 flex items-center gap-2 text-sm hover:bg-purple-800/80 'hover:bg-purple-900/30"
            >
              <span className="flex-1 text-slate-200">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SvgChevronDown(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Demo component
export function PurpleSelectUIDemo() {
  return (
    <div className="max-w-sm mx-auto p-6 space-y-6">
      <h2 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
        PurpleSelect UI Demo
      </h2>
      <PurpleSelectUI
        label="Single Select"
        placeholder="Pick one"
        helperText="This is just a UI demo."
      />
    </div>
  );
}
