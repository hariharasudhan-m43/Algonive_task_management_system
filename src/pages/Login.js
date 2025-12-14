import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginUser } from "../services/api";

/* RANDOM ENTRANCE DIRECTION */
function getRandomEntrance() {
  const directions = [
    { x: -400, y: 0 },
    { x: 400, y: 0 },
    { x: 0, y: -400 },
    { x: 0, y: 400 },
  ];
  return directions[Math.floor(Math.random() * directions.length)];
}

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const entrance = getRandomEntrance();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center text-slate-200">
      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-400/10 rounded-full blur-[140px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.75,
          x: entrance.x,
          y: entrance.y,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative z-10 w-full max-w-md
          rounded-2xl p-8
          bg-[#020617]
          border border-slate-800
          shadow-[0_0_0_1px_rgba(34,197,94,0.35),0_30px_90px_rgba(34,197,94,0.2)]
        "
      >
        <h1 className="text-2xl font-bold text-green-400 text-center">
          ACCESS SYSTEM
        </h1>
        <p className="text-sm text-slate-400 text-center mt-2">
          Authenticate to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full rounded-xl bg-[#020617]
              border border-slate-800
              px-4 py-3 text-sm
              text-slate-200 placeholder-slate-500
              focus:outline-none focus:border-green-400
              focus:shadow-[0_0_0_1px_rgba(34,197,94,0.7)]
              transition
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full rounded-xl bg-[#020617]
              border border-slate-800
              px-4 py-3 text-sm
              text-slate-200 placeholder-slate-500
              focus:outline-none focus:border-green-400
              focus:shadow-[0_0_0_1px_rgba(34,197,94,0.7)]
              transition
            "
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            className="
              relative w-full rounded-xl py-3
              text-sm font-semibold text-green-400
              bg-green-500/10
              border border-green-500/40
              hover:bg-green-500/20
              transition overflow-hidden
            "
          >
            <span className="absolute inset-0 bg-green-400/10 blur-xl animate-pulse" />
            <span className="relative">
              {loading ? "VERIFYING..." : "LOGIN"}
            </span>
          </motion.button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          New here?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
