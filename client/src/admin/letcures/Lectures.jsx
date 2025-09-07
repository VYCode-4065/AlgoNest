import React, { useState } from "react";
import Button from "../../components/Button";
import AddLecture from "./AddLecture";

const Lectures = () => {
  const [defaultMode, setDefaultMode] = useState(true);

  return (
    <div className="container py-3 px-5 grid gap-2">
      <div className="grid grid-cols-2 gap-5 py-5 px-5">
        <Button
          onClick={() => setDefaultMode(true)}
          className={`w-full px-3 py-1 ${
            defaultMode
              ? "bg-purple-600/70 hover:bg-purple-700/80 text-slate-100"
              : ""
          }  `}
        >
          Add Lecture
        </Button>
        <Button
          onClick={() => setDefaultMode(false)}
          className={`w-full px-3 py-1  ${
            !defaultMode
              ? "bg-purple-600/70 hover:bg-purple-700/80 text-slate-100"
              : ""
          } `}
        >
          Update Lecture
        </Button>
      </div>
      <hr />
      <div className="container">
        <AddLecture />
      </div>
    </div>
  );
};

export default Lectures;
