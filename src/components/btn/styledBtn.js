import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddBtn = ({ btnText, onClick, isIcon, iconClass }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isIcon
          ? iconClass
          : "flex items-center bg-indigo-600 text-white  px-2 py-1 rounded-lg hover:bg-indigo-500 transition-all"
      } `}
    >
      <span>
        <AiOutlinePlus className={`me-1 text-sm ${isIcon ? "hidden" : ""}`} />
      </span>
      <span className={` ${isIcon ? "text-xl" : "text-sm"}`}>{btnText}</span>
    </button>
  );
};

export default AddBtn;
