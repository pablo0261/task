import { useState, useEffect } from 'react';
import TaskList from '../../components/Tasks/TasksList/TaskList';
import axios from 'axios';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aquí debes hacer una solicitud GET a la API para obtener las tareas asignadas al usuario actual
    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las tareas:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Mis Tareas</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default MyTasks;
