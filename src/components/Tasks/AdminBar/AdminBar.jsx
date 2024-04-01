// En AdminBar.jsx
import { useContext } from 'react';
import  TasksContext  from '../../../views/myTasks/MyTasksView'; // Asegúrate de que la ruta sea correcta

const AdminBar = () => {
  const { showForm, setShowForm } = useContext(TasksContext);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <button onClick={toggleForm}>{showForm ? 'Cerrar Formulario' : 'Crear Nueva Tarea'}</button>
      </div>
      <div>
        {/* Aquí podrías agregar tus inputs o selects para filtrar las tareas */}
        <input placeholder="Filtrar por nombre..." />
        <input placeholder="Filtrar por email..." />
        {/* Puedes expandir esto con selects para el estado de la tarea, etc. */}
      </div>
    </div>
  );
};

export default AdminBar;
