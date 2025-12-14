import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { registerUser } from "../services/api";

/* RANDOM ENTRANCE DIRECTION */
function getRandomEntrance() {
  const directions = [
    { x: -500, y: 0 },
    { x: 500, y: 0 },
    { x: 0, y: -500 },
    { x: 0, y: 500 },
  ];
  return directions[Math.floor(Math.random() * directions.length)];
}

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const entrance = getRandomEntrance();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser({ name, email, password });
      login(data.user, data.token);
      navigate("/");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center text-slate-200">
      {/* Rotating glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-40"
      >
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-green-400/10 rounded-full blur-[160px]" />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
          x: entrance.x,
          y: entrance.y,
          rotate: -3,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative z-10 w-full max-w-lg
          rounded-2xl p-10
          bg-[#020617]
          border border-slate-800
          shadow-[0_0_0_1px_rgba(34,197,94,0.35),0_40px_120px_rgba(34,197,94,0.25)]
        "
      >
        <h1 className="text-2xl font-bold text-green-400">
          INITIALIZE USER
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Create your access credentials
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
            <motion.span
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/25 to-transparent"
            />
            <span className="relative">
              {loading ? "CREATING..." : "REGISTER"}
            </span>
          </motion.button>
        </form>

        <p className="text-xs text-slate-400 mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
