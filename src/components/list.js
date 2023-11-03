import React, { useState } from "react";
import AddBtn from "./btn/styledBtn";
import TodoItem from "./todoItem/todoItem";
import { MdClose } from "react-icons/md";

const List = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <section className="w-1/2 ms-4 p-4 rounded-lg bg-white">
        <div className="flex justify-between border-b-2 pb-1 mb-4">
          <h3 className="">Date</h3>
          <AddBtn btnText={"NEW TASK"} onClick={toggleModal} />
        </div>
        <div className="flex flex-col">
          <TodoItem />
        </div>
      </section>

      {/* new task modal */}
      <div
        className={`${
          isVisible ? "" : "hidden"
        } bg-black/20 w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex`}
      >
        <div
          className={`h-1/4 w-[30%] rounded-lg mx-auto my-auto transition-all bg-white shadow relative ${
            isVisible ? "" : "hidden"
          }`}
        >
          <h3 className="text-center my-4">Add New Task</h3>
          <AddBtn
            btnText={<MdClose />}
            onClick={toggleModal}
            isIcon={true}
            iconClass={"absolute right-5 top-4"}
          />
          <div>
            <p>test</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
