const express = require("express");
const Task = require("../models/taskModel"); // ✅ Import Task model

const router = express.Router();

// ✅ Get All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
// ✅ Create a New Task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
// ✅ Update a Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Delete a Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
