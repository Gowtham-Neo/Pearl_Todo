import React, { useState } from "react";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDown } from "react-icons/ai"; 
import useTaskStore from "../store/useTaskStore";

const TaskList = ({ tasks, onDelete, onUpdate, onComplete }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    recurrenceType: "",
    customInterval: "",
    specificDaysOfWeek: [],
    nthDayOfMonth: "",
    isActive: false,
  });

  const { task, resetTask } = useTaskStore();


  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setUpdatedTask(task); 
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDaysOfWeekChange = (e) => {
    const { value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      specificDaysOfWeek: prev.specificDaysOfWeek.includes(value)
        ? prev.specificDaysOfWeek.filter((day) => day !== value)
        : [...prev.specificDaysOfWeek, value],
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(editTaskId, updatedTask);
    setEditTaskId(null);
    resetTask();
  };

  const handleDeleteTask = async (e, id) => {
    e.preventDefault();
    try {
      await onDelete(id);
      resetTask();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.warning("Failed to delete task.");
    }
  };


  const toggleTaskDetails = (id) => {
    setExpandedTaskId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="m-8 w-96 font-serif">
      <h2 className="mb-4 text-lg font-bold">Task List (Pendings)</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">
          Add new tasks to boost your productivity!
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col p-4 mb-2 border rounded bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              {editTaskId === task.id ? (
                <form onSubmit={handleUpdateSubmit} className="flex flex-col">
                  <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleUpdateChange}
                    className="p-2 mb-2 border rounded"
                    placeholder="Title"
                    required
                  />
                  <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleUpdateChange}
                    className="p-2 mb-2 border rounded"
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={updatedTask.startDate}
                    onChange={handleUpdateChange}
                    className="p-2 mb-2 border rounded"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={updatedTask.endDate}
                    onChange={handleUpdateChange}
                    className="p-2 mb-2 border rounded"
                    placeholder="End Date"
                  />
                  <select
                    name="recurrenceType"
                    className="w-full p-2 mb-4 border rounded"
                    value={updatedTask.recurrenceType}
                    onChange={handleUpdateChange}
                  >
                    <option value="">Select Recurrence Type</option>
                    <option value="None">None</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>

                  {updatedTask.recurrenceType && updatedTask.recurrenceType !=
                    "None" && (
                    <input
                      type="number"
                      name="customInterval"
                      placeholder="Interval (e.g., every X days/weeks)"
                      className="w-full p-2 mb-4 border rounded"
                      value={updatedTask.customInterval}
                      onChange={handleUpdateChange}
                    />
                  )}

                  {updatedTask.recurrenceType === "Weekly" && (
                    <div className="mb-4">
                      <label>Select Days of the Week</label>
                      <div className="flex flex-wrap w-full space-x-2">
                        {" "}
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
                              checked={updatedTask.specificDaysOfWeek.includes(
                                day
                              )}
                              className="mr-2"
                              onChange={handleDaysOfWeekChange}
                            />{" "}
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {task.recurrenceType === "Weekly" && (
                    <div className="mb-4">
                      Select Days of the Week
                      <div className=" flex w-1/2  space-x-2">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day) => (
                          <label key={day}>
                            <input
                              type="checkbox"
                              value={day}
                              checked={task.specificDaysOfWeek.includes(day)}
                              onChange={handleDaysOfWeekChange}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {updatedTask.recurrenceType === "Monthly" && (
                    <input
                      type="number"
                      name="nthDayOfMonth"
                      placeholder="Nth day of the month (e.g., 2)"
                      className="w-full p-2 mb-4 border rounded"
                      value={updatedTask.nthDayOfMonth}
                      onChange={handleUpdateChange}
                    />
                  )}

                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white bg-green-500 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTaskId(null)}
                    className="mt-2 text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                 
                  <div className="relative p-4">
                    <button
                      className="absolute text-red-500 top-1 right-1"
                      onClick={(e) => handleDeleteTask(e, task.id)}
                      aria-label="Delete"
                    >
                      <RxCross1 size={21} />
                    </button>
                    <h3 className="font-bold font-mono text-lg">
                      {task.title}
                    </h3>
                    <p className="font-serif">{task.description}</p>

                    <button
                      onClick={() => toggleTaskDetails(task.id)}
                      className="mt-2 text-blue-500 flex items-center"
                      aria-label="Toggle Details"
                    >
                      <span className="mr-1">Details</span>
                      <AiOutlineDown
                        size={18}
                        className={`transition-transform ${
                          expandedTaskId === task.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                 
                  {expandedTaskId === task.id && (
                    <div className="mt-2 p-3 border-l-4 border-red-500 bg-red-50 rounded-lg">
                      <p>
                        <strong>Start Date:</strong>{" "}
                        {new Date(task.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>End Date:</strong>{" "}
                        {new Date(task.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Recurrence:</strong> {task.recurrenceType}
                      </p>
                      <p>
                        <strong>Custom Interval:</strong> {task.customInterval}
                      </p>
                      {task.specificDaysOfWeek &&
                        task.specificDaysOfWeek.length > 0 && (
                          <p>
                            <strong>Days of Week:</strong>{" "}
                            {task.specificDaysOfWeek.join(", ")}
                          </p>
                        )}
                      {task.nthDayOfMonth && (
                        <p>
                          <strong>Nth Day of Month:</strong>{" "}
                          {task.nthDayOfMonth}
                        </p>
                      )}
                      <p className=" text-red-500 font-bold">
                        <strong>Status:</strong>{" "}
                        {task.isActive ? "Incomplete" : "Complete"}
                      </p>
                    </div>
                  )}

                  <div className="flex mt-2 space-x-2">
                    <button
                      className="flex items-center px-3 py-1 text-sm text-white bg-blue-500 rounded"
                      onClick={() => handleEditClick(task)}
                    >
                      <FaEdit size={14} className="mr-1" /> Update
                    </button>
                    <button
                      className="flex items-center px-3 py-1 text-sm text-white bg-green-500 rounded"
                      onClick={() => onComplete(task.id)}
                    >
                      <FaCheck size={14} className="mr-1" />
                      Mark as Complete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
