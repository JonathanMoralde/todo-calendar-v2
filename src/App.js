import { useState } from "react";
import Calendar from "./components/calendar";
import List from "./components/list";
import { TodoCalendarContext } from "./context/TodoCalendartContext";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <main className="h-screen max-w-5xl py-24 mx-auto">
        <header>
          <h1 className="text-center mb-4 text-2xl font-semibold tracking-wider uppercase">
            To-Do Calendar
          </h1>
        </header>
        <section className="flex">
          <TodoCalendarContext.Provider value={{ date, setDate }}>
            <Calendar />
            <List />
          </TodoCalendarContext.Provider>
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
    </>
  );
}

export default App;
