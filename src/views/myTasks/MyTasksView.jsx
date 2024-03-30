import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../../components/Tasks/TasksList/TaskList';
import CreateTask from '../../components/Tasks/CreateTasks/CreatTasks';
import Swal from 'sweetalert2';
import StoreItem from '../../helpers/LocalStorage'

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks)

  const storedToken = JSON.parse(localStorage.getItem(StoreItem.tokenUserLogged));
  console.log("Token almacenado en localStorage:", storedToken);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las tareas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener las tareas',
          text: error.message,
        });
      });
  }, []);

  const handleCreateTask = async (newTaskData) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', newTaskData);
      if (response.status === 200) {
        setTasks(prevTasks => [...prevTasks, response.data.task]);
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada con éxito',
        });
      } 
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la tarea',
        text: error.message,
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    console.log("taskId delete", taskId)
    axios.delete(`http://localhost:3000/tasks/${taskId}`)
      .then(() => {
        // Elimina la tarea del estado para reflejar los cambios en la UI
        setTasks(tasks.filter(task => task.id !== taskId));
        Swal.fire('Eliminado!', 'La tarea ha sido eliminada.', 'success');
      })
      .catch(error => {
        console.error('Error al eliminar la tarea:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar la tarea',
          text: error.message,
        });
      });
  };

  const handleUpdateTask = (taskId, updatedTask) => {

    const taskToUpdate = tasks.find(task => task.id === taskId);
    const updatedTaskData = {
      ...taskToUpdate,
      status: updatedTask
    };

    console.log("updatedTaskData", updatedTaskData) 
    axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTaskData)
      .then((response) => {
        // Actualiza la tarea en el estado para reflejar los cambios en la UI
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, ...response.data.task };
          }
          return task;
        });
        setTasks(updatedTasks);
        Swal.fire('Actualizado!', 'La tarea ha sido actualizada.', 'success');
      })
      .catch(error => {
        console.error('Error al actualizar la tarea:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la tarea',
          text: error.message,
        });
      });
  };

  const handleUpdateFullTask = (taskId, updatedTaskData) => {
    axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTaskData)
      .then((response) => {
        // Actualiza la tarea en el estado para reflejar los cambios en la UI
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, ...response.data.task };
          }
          return task;
        });
        setTasks(updatedTasks);
        Swal.fire('Actualizado!', 'La tarea ha sido actualizada.', 'success');
      })
      .catch(error => {
        console.error('Error al actualizar la tarea:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la tarea',
          text: error.message,
        });
      });
  };

  console.log(localStorage)
  return (
    <div>
      <h1>Mis Tareas</h1>
      <CreateTask onCreateTask={handleCreateTask} /> {/* Aquí pasamos la función handleCreateTask como prop */}
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} onFullUpdate={handleUpdateFullTask}/>
    </div>
  );
};

export default MyTasks;
