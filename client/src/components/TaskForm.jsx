
import React from "react";
import useTaskStore from "../store/useTaskStore";
import { FaPlus } from "react-icons/fa6";
const TaskForm = ({ onAddTask }) => {
  const { task, updateTask, resetTask } = useTaskStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (!task.title || !task.startDate || !userId) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = { ...task, userId };
    await onAddTask(newTask);
    resetTask(); 
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateTask(name, type === "checkbox" ? checked : value);
  };

  const handleDaysOfWeekChange = (e) => {
    const { value } = e.target;
    updateTask(
      "specificDaysOfWeek",
      task.specificDaysOfWeek.includes(value)
        ? task.specificDaysOfWeek.filter((day) => day !== value)
        : [...task.specificDaysOfWeek, value]
    );
  };

  return (
    <div className="w-1/3 p-4 bg-white rounded-lg shadow-md task-form font-serif">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.description}
          onChange={handleInputChange}
        />
        <label htmlFor="">Start Date:</label>
        <input
          type="date"
          name="startDate"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.startDate}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="">End Date:</label>
        <input
          type="date"
          name="endDate"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.endDate}
          onChange={handleInputChange}
        />

        <select
          name="recurrenceType"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.recurrenceType}
          onChange={handleInputChange}
        >
          <option value="">Select Recurrence Type</option>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>

        {task.recurrenceType && task.recurrenceType != "None" && (
          <input
            type="number"
            name="customInterval"
            placeholder="Interval (e.g., every X days/weeks)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={task.customInterval}
            onChange={handleInputChange}
          />
        )}

       
        {task.recurrenceType === "Weekly" && (
          <div className="mb-4">
            <label className="font-semibold">Select Days of the Week</label>
            <div className="flex flex-wrap w-full space-x-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="flex items-center w-1/3">
                  <input
                    type="checkbox"
                    value={day}
                    checked={task.specificDaysOfWeek.includes(day)}
                    onChange={handleDaysOfWeekChange}
                    className="mr-2"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        )}

  
        {task.recurrenceType === "Monthly" && (
          <input
            type="number"
            name="nthDayOfMonth"
            placeholder="Nth day of the month (e.g., 2)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={task.nthDayOfMonth}
            onChange={handleInputChange}
          />
        )}

       
        <div className="flex justify-start mt-4">
          <button
            type="submit"
            className="flex flex-wrap px-3 py-1 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            <FaPlus size={21}className="mt-1"/>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
