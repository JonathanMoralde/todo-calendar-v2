import React, { useState, useRef, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

const TodoItem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  const toggleEditForm = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  return (
    <div className="bg-indigo-600 text-white rounded-lg py-2 px-4 mb-2">
      <div
        className={`flex justify-between items-center ${
          isVisible ? "hidden" : ""
        }`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            id="checkbox2"
            className="default:ring-2 me-2"
          />
          <label htmlFor="checkbox2">Todo Task Here</label>
        </div>

        {/* action */}
        <div className="text-xl">
          <button className="me-4  transition-opacity">
            <MdEdit className=" hover:opacity-70" onClick={toggleEditForm} />
          </button>
          <button className="transition-opacity">
            <MdDelete className=" hover:opacity-70" />
          </button>
        </div>
      </div>

      {/* edit form */}
      <div className={`w-full ${isVisible ? "" : "hidden"}`}>
        <form className="flex justify-between items-center">
          <label className="block ms-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Todo Task Here"
              className="mt-1 block w-full px-1 bg-gray-100 focus:outline-none
      invalid:border-pink-500 invalid:text-pink-600
    "
            />
          </label>
          <div className="flex text-xl">
            <button type="button" className="me-4" onClick={toggleEditForm}>
              <MdClose />
            </button>
            <button>
              <MdCheck />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoItem;
