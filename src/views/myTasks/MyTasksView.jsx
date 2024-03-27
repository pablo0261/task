import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../../components/Tasks/TasksList/TaskList';
import CreateTask from '../../components/Tasks/CreateTasks/CreatTasks';
import Swal from 'sweetalert2';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Aquí debes hacer una solicitud GET a la API para obtener las tareas asignadas al usuario actual
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
      // Realizar una solicitud POST a la API para crear una nueva tarea
      const response = await axios.post('http://localhost:3000/tasks', newTaskData);
      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        // Actualizar el estado local de las tareas con la nueva tarea creada por la API
        setTasks([...tasks, response.data.task]);
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada con éxito',
        });
      } 
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error al crear la tarea:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la tarea',
        text: error.message,
      });
    }
  };

  return (
    <div>
      <h1>Mis Tareas</h1>
      <CreateTask onCreateTask={handleCreateTask} /> {/* Aquí pasamos la función handleCreateTask como prop */}
      <TaskList  tasks={tasks} />
    </div>
  );
};

export default MyTasks;
