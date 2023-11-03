import Calendar from "./components/calendar";
import List from "./components/list";

function App() {
  return (
    <>
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
      </main>
      <footer className="max-w-5xl mx-auto text-center">
        <p>Jhm. Jonathan Moralde &copy; 2023</p>
      </footer>
    </>
  );
}

export default App;
