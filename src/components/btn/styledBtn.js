import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddBtn = ({ btnText, onClick, isIcon, iconClass }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isIcon
          ? iconClass
          : "flex items-center text-indigo-600 font-medium  px-2 w-1/4 hover:opacity-80"
      } `}
    >
      <span>
        <AiOutlinePlus className={`me-1 ${isIcon ? "hidden" : ""}`} />
      </span>
      <span className={` ${isIcon ? "text-xl" : "text-sm"}`}>{btnText}</span>
    </button>
  );
};

export default AddBtn;
