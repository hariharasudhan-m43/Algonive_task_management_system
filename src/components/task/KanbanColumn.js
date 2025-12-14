import { motion } from "framer-motion";

export default function KanbanColumn({
  title,
  tasks,
  onTaskClick,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="rounded-xl bg-[#020617] border border-slate-800 p-4"
    >
      <h2 className="text-sm font-semibold text-green-400 mb-4 tracking-wide">
        {title}
      </h2>

      <motion.div layout className="space-y-4">
        {tasks.map((task, i) => (
          <motion.div
            key={task._id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{
              y: -4,
              boxShadow:
                "0 0 0 1px rgba(34,197,94,0.5), 0 10px 30px rgba(34,197,94,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onTaskClick(task)}
            className="cursor-pointer rounded-xl bg-[#020617] border border-slate-800 p-4 transition"
          >
            <p className="text-sm font-medium text-slate-200">
              {task.title}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              Priority: {task.priority}
            </p>
          </motion.div>
        ))}

        {tasks.length === 0 && (
          <p className="text-xs text-slate-500">
            No tasks here
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
