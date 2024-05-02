import  { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TaskList from "../../components/Tasks/TasksList/TaskList";
import CreateTask from "../../components/Tasks/CreateTasks/CreatTasks";
import NabBar from "../../components/NabBar/NabBar";
import styles from "./myTask.module.sass";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { getTask, getUsers, addTask, deleteTask, updateTask } from '../../redux/actions/actions'; 

export const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

const MyTasks = () => {
  const dispatch = useDispatch();

  const [showCreateForm, setshowCreateForm] = useState(false);
  const [admin, setAdmin] = useState(null); // Corregido: inicializa admin como null
  const [tasks, setTasks] = useState([]); // Corregido: estado local para almacenar las tareas
console.log("tasks", tasks)
  const tasksState = useSelector(state => state.tasks.tasks);
 
  useEffect(() => {
    dispatch(getTask());
    dispatch(getUsers());
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
  }, []); // Corregido: agregado admin a las dependencias de useEffect

  useEffect(() => {
    // Actualizar el estado local de las tareas cuando cambie el estado global de las tareas
    setTasks(tasksState);
  }, [tasksState]); // Corregido: cambiar la dependencia a tasksState

  const handleCreateTask = async (newTaskData) => {
    try {
      dispatch(addTask(newTaskData)); 
      setshowCreateForm(false);
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
        showCreateForm,
        setshowCreateForm,
      }}
    >
      <div>
        <div className={styles.logo}>
          <h1 className={styles.h1Logo}>Mis Tareas</h1>
        </div>
        {admin && <NabBar />}
        {showCreateForm && <CreateTask/>}
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
