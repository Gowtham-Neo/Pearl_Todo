import React, { useState } from "react";
import { FaUndo, FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const CompletedTaskList = ({
  completedTasks,
  onDelete,
  onMarkAsIncomplete,
}) => {
  return (
    <div className="m-8 font-serif">
      <h2 className="mb-4 text-lg font-bold">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks available.</p>
      ) : (
        <ul>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMarkAsIncomplete={onMarkAsIncomplete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const TaskCard = ({ task, onDelete, onMarkAsIncomplete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <li className="relative flex flex-col p-4 mb-2 border font-serif rounded bg-gray-100 hover:bg-gray-200 transition w-full">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={() => onDelete(task.id)}
        aria-label="Delete"
      >
        <RxCross1 size={21} className="font-extrabold" />
      </button>
      <div className="flex items-center cursor-pointer" onClick={toggleDetails}>
        <button className="text-blue-500 hover:text-blue-700 mr-4">
          <FaCaretDown size={18} />
        </button>
        <h3 className="font-mono font-bold text-lg">{task.title}</h3>
      </div>

      {showDetails && (
        <div className="mt-2 p-3 border-l-4 border-green-500 bg-green-50 rounded-lg">
          {task.description && <p>Description: {task.description}</p>}
          {task.startDate && (
            <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
          )}
          {task.endDate && (
            <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
          )}
          {task.recurrenceType && <p>Recurrence: {task.recurrenceType}</p>}
          {task.customInterval && <p>Custom Interval: {task.customInterval}</p>}
          {task.specificDaysOfWeek && task.specificDaysOfWeek.length > 0 && (
            <p>Days of Week: {task.specificDaysOfWeek.join(", ")}</p>
          )}
          {task.nthDayOfMonth && <p>Nth Day of Month: {task.nthDayOfMonth}</p>}

        
          <p className="text-green-700 font-bold mt-2">
            <span className="font-semibold">Status:</span> Completed
          </p>
          <button
            className="mt-3 flex items-center text-red-600 bg-red-100 hover:bg-red-200 border border-red-400 rounded-md px-3 py-1 text-sm transition duration-200"
            onClick={() => onMarkAsIncomplete(task.id)}
            aria-label="Mark as Incomplete"
          >
            <FaUndo size={18} className="mr-2" />
            Mark as Incomplete
          </button>
        </div>
      )}
    </li>
  );
};

export default CompletedTaskList;
