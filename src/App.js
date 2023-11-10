import { useState, useEffect } from "react";
import Calendar from "./components/calendar";
import List from "./components/list";
import { TodoCalendarContext } from "./context/TodoCalendartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [date, setDate] = useState(new Date());
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      const url = "https://todo-calendar-v2-api.onrender.com/api/getDates";

      const result = await axios.get(url);

      setAllDates(result.data);
    };

    fetchDates();
  }, []);

  return (
    <>
      <TodoCalendarContext.Provider
        value={{ date, setDate, allDates, setAllDates }}
      >
        <main className="h-screen max-w-5xl py-24 mx-auto">
          <header>
            <h1 className="text-center mb-4 text-2xl font-semibold tracking-wider uppercase">
              To-Do Calendar
            </h1>
          </header>
          <section className="flex">
            <Calendar />
            <List />
          </section>
          <div className="flex justify-center mt-10">
            <div className="flex items-center me-4">
              <div className="h-4 w-4 border-2 border-indigo-400 rounded me-1"></div>
              <p>- Today</p>
            </div>
            <div className="flex items-center me-4">
              <div className="h-2 w-6 bg-red-400 rounded-t-lg me-1"></div>
              <p>- Unfinished Task</p>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-6 bg-green-400 rounded-t-lg me-1"></div>
              <p>- Finished Task</p>
            </div>
          </div>
        </main>
        <footer className="max-w-5xl mx-auto text-center">
          <p>Jhm. Jonathan Moralde &copy; 2023</p>
        </footer>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </TodoCalendarContext.Provider>
    </>
  );
}

export default App;
