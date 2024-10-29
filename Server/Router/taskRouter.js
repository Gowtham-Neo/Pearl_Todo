const express = require("express");
const { Task } = require("../models");
const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { userId, title, startDate } = req.body;

    
    if (!userId || !title || !startDate) {
      return res
        .status(400)
        .json({ error: "userId, title, and startDate are required." });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(400)
      .json({ error: "Error creating task", details: error.message });
  }
});


router.post("/all", async (req, res) => {
  console.log("Received request to /all"); 
  const { userId } = req.body;
  console.log("userId:", userId);
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required to fetch tasks" });
    }
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res
      .status(500)
      .json({ error: "Error fetching tasks", details: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching task", details: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.body.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error updating task", details: error.message });
  }
});

router.put("/:id/complete", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    const { isActive } = req.body; 
    task.isActive = isActive;
    await task.save();

    res.status(200).json(task); 
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error deleting task", details: error.message });
  }
});

module.exports = router;
