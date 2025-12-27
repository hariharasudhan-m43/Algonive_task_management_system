import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTeams } from "../../services/api";
import useAuthStore from "../../store/authStore";

export default function TeamSwitcher() {
  const { token, activeTeam, setActiveTeam } = useAuthStore();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

 // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (!token) return;

  let cancelled = false;

  async function loadTeams() {
    try {
      setLoading(true);
      const data = await getTeams();

      if (cancelled) return;

      setTeams(data);

      if (!activeTeam && data.length > 0) {
        setActiveTeam(data[0]);
      }
    } catch {
      console.error("Failed to load teams");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  loadTeams();

  return () => {
    cancelled = true;
  };
}, [token, setActiveTeam]);

  // ✅ Nothing renders if not logged in
  if (!token) return null;

  if (loading) {
    return (
      <span className="text-xs text-slate-500">
        Loading teams…
      </span>
    );
  }

  if (teams.length === 0) {
    return (
      <span className="text-xs text-slate-500">
        No teams
      </span>
    );
  }

  function handleChange(e) {
    const team = teams.find((t) => t._id === e.target.value);
    setActiveTeam(team);
  }

  return (
    <motion.select
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      value={activeTeam?._id || ""}
      onChange={handleChange}
      className="
        bg-[#020617]
        text-green-400
        border border-slate-800
        rounded-lg
        px-3 py-1.5
        text-sm
        focus:outline-none
        focus:border-green-400
        focus:shadow-[0_0_0_1px_rgba(34,197,94,0.6)]
        transition
      "
    >
      {teams.map((team) => (
        <option
          key={team._id}
          value={team._id}
          className="bg-[#020617] text-green-400"
        >
          {team.name}
        </option>
      ))}
    </motion.select>
  );
}
