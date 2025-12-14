import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createTask, getUsers } from "../../services/api";
import useAuthStore from "../../store/authStore";

export default function CreateTask({ onTaskCreated }) {
  const { user, activeTeam } = useAuthStore();
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (user.role === "admin") {
      getUsers().then(setUsers);
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!activeTeam || !title) return;

    const task = await createTask(activeTeam._id, {
      title,
      priority: "Medium",
      assignedTo:
        user.role === "admin" && assignedTo
          ? assignedTo
          : undefined,
    });

    onTaskCreated(task);
    setTitle("");
    setAssignedTo("");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 items-end"
    >
      <div className="flex-1">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type a task and press enter"
          className="
            w-full rounded-xl bg-[#020617] border border-slate-800
            px-4 py-3 text-sm text-slate-200
            focus:outline-none focus:border-green-400
            focus:shadow-[0_0_0_1px_rgba(34,197,94,0.6)]
            transition
          "
        />
      </div>

      {user.role === "admin" && (
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="
            rounded-xl bg-[#020617] border border-slate-800
            px-3 py-3 text-sm text-slate-300
            focus:outline-none focus:border-green-400
          "
        >
          <option value="">Me</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        className="
          rounded-xl px-5 py-3 text-sm font-medium
          bg-green-500/10 text-green-400
          border border-green-500/30
          hover:bg-green-500/20
          transition
        "
      >
        Add
      </button>
    </motion.form>
  );
}
