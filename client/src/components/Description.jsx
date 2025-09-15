import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Bold, Italic, Underline } from "lucide-react"; // icons for toolbar

const DescriptionEditor = ({ desData, defaultValue = "" }) => {
  const contentRef = useRef(null);
  const [html, setHtml] = useState(defaultValue);

  const handleChange = (e) => {
    setHtml(e.target.value);
    desData(e.target.value);
  };

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const btnClass =
    "p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-700";

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg dark:bg-slate-800 dark:border">
      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2 mb-2">
        <button
          type="button"
          onClick={() => applyFormat("bold")}
          className={btnClass}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat("italic")}
          className={btnClass}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat("underline")}
          className={btnClass}
        >
          <Underline size={16} />
        </button>
      </div>

      {/* Editable area */}
      <ContentEditable
        innerRef={contentRef}
        html={html}
        disabled={false}
        onChange={handleChange}
        className="h-40 p-2 border rounded overflow-y-auto focus:outline-none prose prose-sm dark:prose-invert max-w-none"
      />
    </div>
  );
};

export default DescriptionEditor;
