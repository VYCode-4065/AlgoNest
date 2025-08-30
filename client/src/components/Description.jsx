import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const DescriptionEditor = ({ desData }) => {
  const [descriptionData, setDescriptionData] = useState("");
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "link",
    ],
    theme: "snow",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        desData(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <div ref={quillRef} className="h-40" defaultValue={desData} />
    </div>
  );
};

export default DescriptionEditor;
