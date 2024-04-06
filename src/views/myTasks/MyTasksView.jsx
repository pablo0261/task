import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../../components/Tasks/TasksList/TaskList";
import CreateTask from "../../components/Tasks/CreateTasks/CreatTasks";
import NabBar from "../../components/NabBar/NabBar";
import styles from "./myTask.module.sass";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      try {
        const decodedToken = jwtDecode(tokenStorage);
        setAdmin(decodedToken.typeAdmin);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al decodificar el token",
          text: error.message,
        });
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error al obtener las tareas",
          text: error.message,
        });
      });
  }, []);

  const handleCreateTask = async (newTaskData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        newTaskData
      );
      if (response.status === 200) {
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
        Swal.fire({
          icon: "success",
          title: "Tarea creada con éxito",
        });
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la tarea",
        text: error.message,
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/tasks/${taskId}`)
      .then(() => {
        // Elimina la tarea del estado para reflejar los cambios en la UI
        setTasks(tasks.filter((task) => task.id !== taskId));
        Swal.fire("Eliminado!", "La tarea ha sido eliminada.", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Error al eliminar la tarea",
          text: error.message,
        });
      });
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTaskData = {
      ...taskToUpdate,
      status: updatedTask,
    };

    axios
      .put(`http://localhost:3000/tasks/${taskId}`, updatedTaskData)
      .then((response) => {
        // Actualiza la tarea en el estado para reflejar los cambios en la UI
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, ...response.data.task };
          }
          return task;
        });
        setTasks(updatedTasks);
        Swal.fire("Actualizado!", "La tarea ha sido actualizada.", "success");
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la tarea",
          text: error.message,
        });
      });
  };

  const handleUpdateFullTask = (taskId, updatedTaskData) => {
    axios
      .put(`http://localhost:3000/tasks/${taskId}`, updatedTaskData)
      .then((response) => {
        // Actualiza la tarea en el estado para reflejar los cambios en la UI
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, ...response.data.task };
          }
          return task;
        });
        setTasks(updatedTasks);
        Swal.fire("Actualizado!", "La tarea ha sido actualizada.", "success");
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la tarea",
          text: error.message,
        });
      });
  };

  return (
    <TasksContext.Provider
      value={{
        admin,
        tasks,
        handleUpdateFullTask,
        handleCreateTask,
        handleDeleteTask,
        handleUpdateTask,
        showForm,
        setShowForm,
      }}
    >
      <div>
        <div className={styles.logo}>
          <h1 className={styles.h1Logo}>Mis Tareas</h1>
        </div>
        {admin && <NabBar />}
        {showForm && <CreateTask />}
        <TaskList />
      </div>
    </TasksContext.Provider>
  );
};

export default MyTasks;
