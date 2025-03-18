"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://your-backend-service.onrender.com/api/tasks";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.title) return;
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task: any) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  const updateTask = async () => {
    if (!editingTask) return;
    try {
      const response = await axios.put(`${API_URL}/${editingTask._id}`, newTask);
      setTasks(tasks.map((task) => (task._id === editingTask._id ? response.data : task)));
      setEditingTask(null);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="mb-3"
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="mb-3"
        />
        {editingTask ? (
          <button onClick={updateTask} className="bg-green-500 w-full">
            Update Task
          </button>
        ) : (
          <button onClick={addTask} className="bg-blue-500 w-full">
            Add Task
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task: any) => (
            <li key={task._id} className="bg-white text-black p-4 mb-3 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEditing(task)} className="bg-yellow-500 px-4 py-2 rounded">
                  Edit
                </button>
                <button onClick={() => deleteTask(task._id)} className="bg-red-500 px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
