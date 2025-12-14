import useAuthStore from "../store/authStore";

const API_BASE_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = useAuthStore.getState().token;
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

// AUTH
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return res.json();
}

// TASKS
export async function getTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function createTask(teamId, task) {
  const res = await fetch(
    `http://localhost:5000/api/tasks/${teamId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(task),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}


export async function updateTaskStatus(teamId, taskId, status) {
  const res = await fetch(
    `http://localhost:5000/api/tasks/${teamId}/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json();
}


export async function deleteTask(teamId, taskId) {
  const res = await fetch(
    `http://localhost:5000/api/tasks/${teamId}/${taskId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
}

export async function getUsers() {
  const res = await fetch("http://localhost:5000/api/users", {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Forbidden");
  return res.json();
}


// TEAMS
export async function getTeams() {
  const res = await fetch("http://localhost:5000/api/teams", {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function getTasksByTeam(teamId) {
  const res = await fetch(`http://localhost:5000/api/tasks/${teamId}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}


export async function createTeam(name) {
  const res = await fetch("http://localhost:5000/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to create team");
  return res.json();
}
