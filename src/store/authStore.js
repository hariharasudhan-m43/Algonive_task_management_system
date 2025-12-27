import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  activeTeam: JSON.parse(localStorage.getItem("activeTeam")) || null,

  setActiveTeam: (team) => {
    localStorage.setItem("activeTeam", JSON.stringify(team));
    set({ activeTeam: team });
  },

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, token: null, activeTeam: null });
  },
}));

export default useAuthStore;
