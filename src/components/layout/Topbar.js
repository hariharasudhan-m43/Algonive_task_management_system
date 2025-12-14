import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";
import TeamSwitcher from "../team/TeamSwitcher";

export default function Topbar() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-16 bg-[#020617] border-b border-slate-800 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-300">
          Workspace
        </span>
        <TeamSwitcher />
      </div>

      <button
        onClick={logout}
        className="text-sm text-slate-400 hover:text-green-400 transition"
      >
        Logout
      </button>
    </motion.header>
  );
}
