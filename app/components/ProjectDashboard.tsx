"use client";

import { useState, useEffect, useRef } from "react";
import TaskModal from "./TaskModal";

export default function ProjectDashboard() {
  const [tasks, setTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState(10);
  const [filter, setFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleScroll = () => {
    if (
      bottomRef?.current?.getBoundingClientRect().bottom <
        window.innerHeight + 50 &&
      !isLoading &&
      visibleTasks < filteredTasks.length
    ) {
      setVisibleTasks((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, visibleTasks, tasks]);

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.status === filter
  );

  const openModal = (task = null) => {
    setEditTask(task); // For editing an existing task
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };

  const handleTaskSubmit = (newTask) => {
    if (editTask) {
      // Update existing task
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    } else {
      // Create new task
      const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1; // Incremental ID
      setTasks([{ ...newTask, id: nextId }, ...tasks]);
    }
    closeModal();
  };

  return (
    <div className="flex flex-col gap-0.5 justify-items-center ml-8">
      <div className="flex flex-col gap-0.5 justify-items-center mb-8 bg">
        <h1 className="text-7xl font-bold pb-6 gradient-title">
          Project Dashboard
        </h1>

        {/* Filter */}
        <select
          onChange={handleFilterChange}
          value={filter}
          className="mt-2 mr-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Add New Task Button */}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={() => openModal()}
        >
          Add New Task
        </button>
      </div>

      {/* Task List */}
      <ol>
        {filteredTasks.slice(0, visibleTasks).map((task) => (
          <li
            key={task.id}
            className="mb-2 p-4 border border-gray-200 rounded-lg"
            onClick={() => openModal(task)}
          >
            <h2 className="text-2xl font-semibold">{task.title}</h2>
            <p>Status: {task.status}</p>
            <p>Assignee: {task.assignee}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
          </li>
        ))}
      </ol>

      {isLoading && <p>Loading more tasks...</p>}
      <div ref={bottomRef} />

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={editTask}
          onSubmit={handleTaskSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
