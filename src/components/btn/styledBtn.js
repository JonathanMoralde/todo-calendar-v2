import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddBtn = () => {
  return (
    <button className="flex items-center bg-indigo-600 text-white  px-2 py-1 rounded-lg hover:opacity-80 transition-opacity">
      <span>
        <AiOutlinePlus className="me-1 text-sm" />
      </span>
      <span className="text-sm">NEW TASK</span>
    </button>
  );
};

export default AddBtn;