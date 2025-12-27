import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-64 bg-[#020617] border-r border-slate-800 p-6 flex flex-col"
    >
      <h1 className="text-lg font-bold tracking-wide text-green-400">
        TASKFLOW
      </h1>

      <nav className="mt-10 space-y-2">
        {[
          { to: "/", label: "Dashboard" },
          { to: "/tasks", label: "Kanban" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-green-500/10 text-green-400 shadow-[0_0_0_1px_rgba(34,197,94,0.4)]"
                  : "text-slate-400 hover:text-green-400 hover:bg-green-500/5"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
