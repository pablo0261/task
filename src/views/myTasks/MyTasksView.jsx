import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import TaskList from "../../components/Tasks/TasksList/TaskList";
import CreateTask from "../../components/Tasks/CreateTasks/CreatTasks";
import NabBar from "../../components/NabBar/NabBar";
import styles from "./myTask.module.sass";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'; 
import { getTask, getUsers, addTask, deleteTask, updateTask } from '../../redux/actions/actions'; 

export const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

const MyTasks = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [admin, setAdmin] = useState();
  const tasks = useSelector(state => state.tasks.tasks);
 
  useEffect(() => {
    dispatch(getTask());
    dispatch(getUsers());
console.log("admin:", admin)
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      try {
        const decodedToken = jwtDecode(tokenStorage);
        console.log("decodedToken:", decodedToken)
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


  const handleCreateTask = async (newTaskData) => {
    try {
      dispatch(addTask(newTaskData)); 
      setShowForm(false);
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
    try {
      dispatch(deleteTask(taskId)); 
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar la tarea",
        text: error.message,
      });
    }
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    try {
      dispatch(updateTask(taskId, updatedTask)); 
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la tarea",
        text: error.message,
      });
    }
  };

  return (
    <TasksContext.Provider
    value={{
      admin,
      tasks,
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
        {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p className={styles.noTasks}>No hay tareas asignadas.</p>
      )}
      </div>
    </TasksContext.Provider>
  );
};

export default MyTasks;
