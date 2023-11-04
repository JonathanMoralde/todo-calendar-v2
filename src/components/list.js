import React, { useContext } from "react";
import { TodoCalendarContext } from "../context/TodoCalendartContext";
import AddBtn from "./btn/styledBtn";
import TodoItem from "./todoItem/todoItem";

const List = () => {
  const { date } = useContext(TodoCalendarContext);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-us", options);

  return (
    <>
      <section className="w-1/2 ms-4 p-4 rounded-lg bg-white">
        <h3 className="text-center mb-4 font-medium text-xl tracking-wide">
          {formattedDate}
        </h3>
        <div className="mb-4 border-b pb-4">
          <form className="flex justify-between">
            <input
              className="w-3/4 focus:outline-none bg-indigo-100 rounded-lg py-2 px-4"
              type="text"
              name="task"
              id="newtask"
              placeholder="Any plans on this day?"
            />
            <AddBtn
              btnText={"New Task"}
              onClick={() => console.log("clicked")}
            />
          </form>
        </div>
        <div className="flex flex-col">
          <TodoItem />
        </div>
      </section>
    </>
  );
};

export default List;
