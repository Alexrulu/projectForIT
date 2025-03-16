const API_URL = "http://localhost:5000/api/tasks"; // La URL de tu API backend

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("No se pudo obtener las tareas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

// Crear una nueva tarea
export const createTask = async (newTask) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error("No se pudo crear la tarea");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Actualizar una tarea existente
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar la tarea");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    throw error;
  }
};

// Marcar una tarea como completada
export async function completeTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });

    if (!response.ok) {
      throw new Error("Error al completar la tarea");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Eliminar una tarea
export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

