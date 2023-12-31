import React, { useContext, useState, useEffect } from "react";
import { TodoCalendarContext } from "../context/TodoCalendartContext";
import axios from "axios";
import AddBtn from "./btn/styledBtn";
import TodoItem from "./todoItem/todoItem";
import { toast } from "react-toastify";
import TodoItemSkeleton from "./todoItem/todoItem_skeleton";

const List = () => {
  const { date, allDates, setAllDates } = useContext(TodoCalendarContext);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-us", options);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TASK FOR SELECTED DATE
  useEffect(() => {
    const fetchData = async () => {
      setData([]); //fix for first element not updating display
      setLoading(true);
      const url = `https://todo-calendar-v2-api.onrender.com/api/getTask/${dateString}`;

      try {
        const result = await axios.get(url);
        console.log(result.data);

        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date, dateString]);

  // FUNCTION FOR INSERTING TASK
  const handleAdd = async (e) => {
    e.preventDefault();

    if (value === "") {
      alert("Please enter a task");
      return;
    }
    let task = {
      description: value,
      completed: false,
    };

    const url = "https://todo-calendar-v2-api.onrender.com/api/addTask";

    try {
      await axios
        .post(url, { date: dateString, task: task })
        .then((response) => {
          toast.success(response.data.message);

          task._id = response.data.taskId;

          setData([...data, task]);
          setValue("");

          const updatedAllDates = [...allDates];
          const dateIndex = updatedAllDates
            .map((d) => d.date)
            .indexOf(dateString);
          if (dateIndex !== -1) {
            updatedAllDates[dateIndex].tasks = [...data, task];

            setAllDates(updatedAllDates);
          } else {
            setAllDates([...allDates, { date: dateString, tasks: [task] }]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-1/2 ms-4 p-4 rounded-lg bg-white h-[28.8125rem] overflow-hidden">
        <h3 className="text-center mb-4 font-medium text-xl tracking-wide">
          {formattedDate}
        </h3>
        <div className="mb-4 border-b pb-4">
          <form className="flex justify-between">
            <input
              className="w-3/4 focus:outline-none bg-indigo-100 rounded-lg py-2 px-4 focus:ring-0 focus:ring-offset-0 border-none"
              type="text"
              name="task"
              id="newtask"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Any plans on this day?"
            />
            <AddBtn
              btnText={"New Task"}
              onClick={(e) => {
                handleAdd(e);
              }}
            />
          </form>
        </div>
        <div id="todoList" className="flex flex-col h-3/4 overflow-y-scroll">
          {loading ? (
            <TodoItemSkeleton />
          ) : (
            data.map((task, index) => {
              return (
                <TodoItem
                  _id={task._id}
                  description={task.description}
                  completed={task.completed}
                  index={index}
                  data={data}
                  setData={setData}
                  dateString={dateString}
                />
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default List;
