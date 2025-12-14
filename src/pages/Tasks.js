import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import CreateTask from "../components/task/CreateTask";
import KanbanColumn from "../components/task/KanbanColumn";
import useAuthStore from "../store/authStore";
import { getTasksByTeam, updateTaskStatus } from "../services/api";

export default function Tasks() {
  const { activeTeam } = useAuthStore();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!activeTeam) return;

    getTasksByTeam(activeTeam._id).then(setTasks);
  }, [activeTeam]);

  function handleTaskMove(task) {
    const nextStatus =
      task.status === "Todo"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Done"
        : "Todo";

    updateTaskStatus(activeTeam._id, task._id, nextStatus).then(
      (updated) => {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === updated._id ? updated : t
          )
        );
      }
    );
  }

  const columns = {
    Todo: tasks.filter((t) => t.status === "Todo"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Done: tasks.filter((t) => t.status === "Done"),
  };

  if (!activeTeam) {
    return (
      <Layout>
        <p className="text-slate-400">Select a team first</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-xl font-bold text-green-400 mb-1">
          Kanban Control Board
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Click a task to advance its state
        </p>

        <CreateTask
          onTaskCreated={(task) =>
            setTasks((prev) => [task, ...prev])
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Object.entries(columns).map(
            ([title, list], i) => (
              <KanbanColumn
                key={title}
                title={title}
                tasks={list}
                onTaskClick={handleTaskMove}
                delay={i * 0.1}
              />
            )
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
