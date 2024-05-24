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
  const tasksState = useSelector(state => state.tasks.tasks);

  const [showCreateForm, setshowCreateForm] = useState(false);
  const [admin, setAdmin] = useState(null); 
  const [userLoged, setuserLoged] = useState(""); 
 
  useEffect(() => {
    dispatch(getTask());
    dispatch(getUsers());
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      try {
        const decodedToken = jwtDecode(tokenStorage);
        setAdmin(decodedToken.typeAdmin);
        setuserLoged(decodedToken.username);
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
      setshowCreateForm(false);
    } catch (error) {
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
      Swal.fire({
        icon: "error",
        title: "Error al eliminar la tarea",
        text: error.message,
      });
    }
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    try {
      dispatch(updateTask(taskId, updatedTask)); // Llama a la acción del Redux para actualizar la tarea
    } catch (error) {
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
        tasks: tasksState,
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
          <p className={styles.userLoged}><strong>User:</strong> {userLoged}</p>
        </div>
        {admin && <NabBar />}
        {showCreateForm && <CreateTask />}
        {tasksState.length > 0 ? (
          <TaskList tasks={tasksState} />
        ) : (
          <p className={styles.noTasks}>No hay tareas asignadas.</p>
        )}
      </div>
    </TasksContext.Provider>
  );
};

export default MyTasks;
