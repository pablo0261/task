// En AdminBar.jsx
import { useContext } from 'react';
import  TasksContext  from '../../../views/myTasks/MyTasksView';
import styles from "./AdminBar.module.sass";

const AdminBar = () => {
  const { showForm, setShowForm } = useContext(TasksContext);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={styles.wrapped}>
      <div>
        <button className={styles.createButton} onClick={toggleForm}>{showForm ? 'Cerrar Formulario' : 'Crear Nueva Tarea'}</button>
      </div>
      <div>
        <input className={styles.input} placeholder="Filtrar por nombre..." />
        <input className={styles.input} placeholder="Filtrar por email..." />
      </div>
    </div>
  );
};

export default AdminBar;
