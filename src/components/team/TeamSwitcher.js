import { useEffect, useState } from "react";
import { getTeams } from "../../services/api";
import useAuthStore from "../../store/authStore";
import { motion } from "framer-motion";

export default function TeamSwitcher() {
  const { activeTeam, setActiveTeam } = useAuthStore();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadTeams() {
      const data = await getTeams();
      setTeams(data);

      if (!activeTeam && data.length > 0) {
        setActiveTeam(data[0]);
      }
    }

    loadTeams();
  }, [activeTeam, setActiveTeam]);

  function handleChange(e) {
    const teamId = e.target.value;
    const team = teams.find((t) => t._id === teamId);
    setActiveTeam(team);
  }

  if (teams.length === 0) {
    return (
      <span className="text-xs text-slate-500">
        No teams
      </span>
    );
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
