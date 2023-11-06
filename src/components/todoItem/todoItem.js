import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const TodoItem = ({ _id, description, completed, index, data, setData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const inputRef = useRef(null);

  const toggleEditForm = () => {
    setIsVisible(!isVisible);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (isVisible) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const [isCheck, setIsCheck] = useState(completed);
  const onChangeHandler = async (e) => {
    const updatedIsCheck = !isCheck; // Toggle the state

    const url = "http://localhost:5000/api/updateTaskStatus";
    try {
      const result = await axios.put(url, {
        taskId: _id,
        u_completed: updatedIsCheck, // Use the updated state
      });

      console.log(result.data);

      // Update the state based on the server response
      setIsCheck(updatedIsCheck);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const url = "http://localhost:5000/api/updateTask";

    const updatedTask = inputRef.current.value;

    const result = await axios.put(url, {
      taskId: _id,
      u_description: updatedTask,
    });
    console.log(result.data);
    setUpdatedDescription(updatedTask);
    toggleEditForm();
  };

  const handleDel = async () => {
    const url = `http://localhost:5000/api/deleteTask/${_id}`;

    await axios
      .delete(url)
      .then((response) => {
        toast.success(response.data.message);
        const newData = data.filter((task, i) => i !== index);
        setData(newData);
      })
      .catch((e) => {
        toast.danger(e);
      });
  };

  return (
    <div className="bg-indigo-600 text-white h-auto rounded-lg py-3 px-4 mb-2">
      <div
        className={`flex justify-between items-center ${
          isVisible ? "hidden" : ""
        }`}
      >
        <div className="flex items-center w-3/4">
          <input
            onChange={(e) => onChangeHandler(e)}
            checked={isCheck}
            value={isCheck}
            type="checkbox"
            id={`checkbox${index}`}
            className="me-2 h-5 w-5 rounded transition checked:text-indigo-600 checked:border-none border-none focus:ring-0 focus:ring-offset-0"
          />
          <label htmlFor={`checkbox${index}`}>
            <span className={`transition-all ${isCheck ? "line-through" : ""}`}>
              {updatedDescription}
            </span>
          </label>
        </div>

        {/* action */}
        <div className="  text-xl">
          <button className=" me-4  transition-opacity">
            <MdEdit className=" hover:opacity-70" onClick={toggleEditForm} />
          </button>
          <button className=" transition-opacity" onClick={handleDel}>
            <MdDelete className=" hover:opacity-70" />
          </button>
        </div>
      </div>

      {/* edit form */}
      <div className={`w-full ${isVisible ? "" : "hidden"}`}>
        <form className="flex justify-between items-center">
          <label className="ms-4 block w-3/4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Todo Task Here"
              className="mt-1 block w-full px-2 py-0 bg-indigo-600 placeholder-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 border-none
      invalid:border-pink-500 invalid:text-pink-600
    "
            />
          </label>
          <div className="flex items-center text-xl">
            <button type="button" className="me-4" onClick={toggleEditForm}>
              <MdClose />
            </button>
            <button type="button" onClick={handleEdit}>
              <MdCheck />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoItem;
