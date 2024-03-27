import { useState, useEffect } from 'react';
import TaskList from '../../components/Tasks/TasksList/TaskList';
import CreateTask from '../../components/Tasks/CreateTasks/CreatTasks';
import axios from 'axios';
import Swal from 'sweetalert2';

const TasksView = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Aquí debes hacer una solicitud GET a la API para obtener todas las tareas disponibles
    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
        console.log("response.data", response.data);
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

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Todas las Tareas</h1>
      <button onClick={() => setShowForm(true)}>Crear Tarea</button>
      {showForm && <CreateTask onCreateTask={handleCreateTask} />}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksView;
