import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import { getTeams, createTeam } from "../services/api";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const { activeTeam, setActiveTeam } = useAuthStore();
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);

      // Force default selection if none
      if (!activeTeam && data.length > 0) {
        setActiveTeam(data[0]);
      }
    });
  }, [activeTeam, setActiveTeam]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const team = await createTeam(name.trim());
    setTeams((prev) => [...prev, team]);
    setActiveTeam(team);
    setName("");
  }

  function isActive(team) {
    return activeTeam?._id === team._id;
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Header */}
        <h1 className="text-xl font-bold text-green-400 mb-1">
          Projects
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Switch between your workspaces
        </p>

        {/* Create Project */}
        <form
          onSubmit={handleCreate}
          className="flex gap-3 items-end mb-10"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create new project"
            className="
              flex-1 rounded-xl bg-[#020617]
              border border-slate-800
              px-4 py-3 text-sm text-slate-200
              focus:outline-none
              focus:border-green-400
              focus:shadow-[0_0_0_1px_rgba(34,197,94,0.6)]
              transition
            "
          />
          <button
            type="submit"
            className="
              rounded-xl px-6 py-3 text-sm font-medium
              bg-green-500/10 text-green-400
              border border-green-500/30
              hover:bg-green-500/20
              transition
            "
          >
            Create
          </button>
        </form>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {teams.map((team, index) => {
              const active = isActive(team);

              return (
                <motion.div
                  key={team._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setActiveTeam(team)}
                  className={`
                    relative cursor-pointer rounded-xl p-6
                    bg-[#020617] border
                    transition-all duration-200
                    ${
                      active
                        ? "border-green-400 shadow-[0_0_0_1px_rgba(34,197,94,0.6),0_20px_40px_rgba(34,197,94,0.15)]"
                        : "border-slate-800 hover:border-green-500/50"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {active && (
                    <motion.div
                      layoutId="active-project-indicator"
                      className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-green-400"
                    />
                  )}

                  <h3
                    className={`text-sm font-semibold ${
                      active
                        ? "text-green-400"
                        : "text-slate-200"
                    }`}
                  >
                    {team.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2">
                    Workspace
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {teams.length === 0 && (
            <p className="text-sm text-slate-500">
              No projects yet
            </p>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
