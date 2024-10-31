import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function App() {
  // Current Task
  const [task, setTask] = useState("");
  // All Tasks
  const [tasks, setTasks] = useState([]);
  // Filter Tasks usecase
  const [filter, setFilter] = useState("All");
  // Function to add tasks
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { name: task, completed: false }]);
      setTask("");
    }
  };
  // Function to toggle task completion
  const toggleCompletion = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };
  // Function to get filtered tasks
  const getFilteredTasks = () => {
    if (filter === "active") {
      return tasks.filter((t) => !t.completed);
    } else if (filter === "completed") {
      return tasks.filter((t) => t.completed);
    }
    return tasks;
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-3 mx-auto">
      <h1 className="text-2xl font-bold text-center">Todo List</h1>
      <div className="flex gap-4 m-3">
        <input
          className="p-3 w-64 border rounded-md text-black"
          type="text"
          name="todo"
          id="todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-[#3B82F6] w-12 rounded flex items-center justify-center"
          onClick={handleAddTask}
        >
          <IoMdAddCircleOutline className="" />
        </button>
      </div>
      <div className="flex items center justify-start gap-3 m-3">
        <button
          className={`w-16 rounded py-1 px-3 text-white ${
            filter === "all" ? "bg-[#3B82F6]" : "bg-gray-400"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`w-20 rounded py-1 px-3 text-white ${
            filter === "active" ? "bg-[#3B82F6] " : "bg-gray-400"
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`w-28 rounded py-1 px-3 text-white ${
            filter === "completed" ? "bg-[#3B82F6] " : "bg-gray-400"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {/* Adding new items */}
      <div>
        {getFilteredTasks().map((t, index) => (
          <div
            key={index}
            className="bg-gray-100 p-2 rounded w-64 mb-2 text-black"
          >
            <span className={t.completed ? "line-through text-gray-500" : ""}>
              {t.name}
            </span>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompletion(index)}
              className="ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
