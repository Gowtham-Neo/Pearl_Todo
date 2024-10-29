import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Sidebar from "../components/SideBar";
import CompletedTaskList from "../components/CompletedList";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const userData = localStorage.getItem("user");
        const userId = userData ? JSON.parse(userData).id : null;
        const response = await fetch(`${BACKEND_URL}/api/tasks/all`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    console.log("Adding Task: ", newTask);
    const { startDate, endDate } = newTask;

    const startDate1 = new Date(startDate);
    const endDate1 = new Date(endDate);

    if (endDate1 <= startDate1) {
      toast.warning("End date must be after the start date.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        toast.success(" Task created successfully!");
      } else {
        const errorData = await response.json();
        toast.warning(
          `Failed to create task: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.warning("An error occurred while creating the task.");
    }
  };
  const handleUpdate = async (taskId, updatedData) => {
    console.log("updated task", updatedData);
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      console.log("Task updated:", updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      toast.success(" Task Updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
        console.log(response);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      toast.success(" Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.warning("An error occurred while deleting the task.");
    }
  };
  const handleMarkAsIncomplete = async (taskId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark task as incomplete");
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      toast.success("successfully Marked as Incomplete");
    } catch (error) {
      console.error("Error marking task as incomplete:", error);
      toast.warning("Failed to mark task as incomplete.");
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }

      const task = await response.json();

      const updatedData = { isActive: !task.isActive };

      const updateResponse = await fetch(
        `${BACKEND_URL}/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await updateResponse.json();
      console.log("Task updated:", updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );

      toast.success("Task completion status updated successfully!");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.warning("An error occurred while updating the task status.");
    }
  };

  const activeTasks = tasks.filter((task) => task.isActive);
  const completedTasks = tasks.filter((task) => !task.isActive);

  return (
    <div className="flex w-full h-screen">
      <ToastContainer />
      <Sidebar />
      <TaskForm onAddTask={handleAddTask} />
      <div className="flex flex-grow overflow-hidden">
        <div className="flex flex-row w-full">
          <div className="flex-grow overflow-auto w-1/2">
            <TaskList
              tasks={activeTasks}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onComplete={handleComplete}
            />
          </div>
          <div className="flex-grow overflow-auto w-1/2">
            <CompletedTaskList
              completedTasks={completedTasks}
              onDelete={handleDelete}
              onMarkAsIncomplete={handleMarkAsIncomplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
